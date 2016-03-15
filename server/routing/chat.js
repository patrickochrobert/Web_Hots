module.exports = {
    setup: setupWebSocket
}

var WebSocketServer = require('ws').Server;
var http = require('http');
var _ = require('lodash');

var userIdCounter = 0;

function setupWebSocket(app) {
    var port = 8080;
    var server = http.createServer(app);
    server.listen(port);
    console.log("http server listening on %d", port);
    var wss = new WebSocketServer({ server: server });
    console.log("websocket server created");

    var serverService = {
        clientList: [],
        groups: [],
        broadcast: function broadcast(method, payload) {
            var message = JSON.stringify({ call: method, data: payload })
            wss.clients.forEach(function each(client) {
                client.send(message);
            });
        }
    };

    wss.on("connection", function(clientSocket) {
        var timestamp = new Date().getTime();
        var user = new User(userIdCounter++, timestamp, clientSocket);
        var dispatcher = new Dispatcher(serverService, user);
        console.info(timestamp, "websocket connection open:", user.id);

        // send welcome message
        serverService.clientList.push(user);
        var currentUserList = _.map(serverService.clientList, function(c) { return _.pick(c, serverService.clientList, ['id', 'name']) });
        user.call("onOpenConnection", { connectionId: user.id, userList: currentUserList });
        serverService.broadcast('onClientConnected', { connectionId: user.id, name: user.name });

        clientSocket.on("message", function(data, flags) {
            console.log("websocket received a message", user.id, data);
            var message = JSON.parse(data);
            if (!message) {
                user.call("error", "invalid message");
                return;
            }
            dispatcher.dispatch(message);
        });

        clientSocket.on("close", function() {
            console.log("websocket connection close", user.id);
            var index = serverService.clientList.indexOf(user);
            if (index >= -1) {
                serverService.clientList.splice(index, 1);
            }
        });
    });
}

function Dispatcher(server, user) {
    this.server = server;
    this.user = user;
}
Dispatcher.prototype.dispatch = function(message) {
    var target = this.user.canDispatch(message.call) ? this.user : this;
    var calltarget = target[message.call];
    if (!calltarget) {
        user.call("error", "invalid call target");
        return;
    }
    calltarget.apply(this, _.values(message.data));
};
Dispatcher.prototype.chat = function(message) {
    this.server.broadcast("chat", { user: this.user.name, message: message });
};
Dispatcher.prototype.registerUserName = function registerUserName(userName) {
    this.user.name = userName;
    this.server.broadcast("updatedUserName", { userId: this.user.id, name: this.user.name });
};

var unbeknownts = ['beaver', 'goat', 'spaceship', 'trucker', 'koala', 'bunny', 'muppet', 'astronaut'];
function User(id, loggedIn, socket) {
    this.id = id;
    this.loggedIn = loggedIn;
    this.socket = socket;
    this.name = 'Unknown ' + unbeknownts[(Math.random() * unbeknownts.length) | 0];
}
User.prototype.call = function call(method, payload) {
    this.socket.send(JSON.stringify({ call: method, data: payload }));
};
User.prototype.canDispatch = function(fnName) {
    return this.hasOwnProperty(fnName);
};
