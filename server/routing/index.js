module.exports = {
    setupRoute: setup
}

var WebSocketServer = require('ws').Server;
var http = require('http');
var express = require('express');
var execute = require('../process/index.js').execute;
var configuration = require('../config.js');

function setup(app) {
    setupStatic(app);
    setupScripts(app);
    setupWebSocket(app);
}

function setupScripts(app) {
    app.get('/mono', function (req, res) {
        execute("mono " + configuration.basePath + "/server/scripts/Program.exe", function (result) {
            res.send(result);
        })
    });
}

function setupStatic(app) {
    console.log(configuration.basePath);
    app.use(express.static(configuration.basePath + '/client'));
    console.log('serving ', configuration.basePath + '/node_modules');
    app.use('/node_modules', express.static(configuration.basePath + '/node_modules'));
}

function setupWebSocket(app) {
    var port = 8080;
    var server = http.createServer(app);
    server.listen(port);

    console.log("http server listening on %d", port);

    var userId;
    var wss = new WebSocketServer({ server: server });
    wss.on("connection", function (ws) {

        console.info("websocket connection open");

        var timestamp = new Date().getTime();
        userId = timestamp;
        ws.send(JSON.stringify({ msgType: "onOpenConnection", msg: { connectionId: timestamp } }));

        ws.on("message", function (data, flags) {
            console.log("websocket received a message", data);
            broadcast(userId + ":" + data);
        });

        ws.on("close", function () {
            console.log("websocket connection close");
        });
    });
    
    function broadcast(message) {
        wss.clients.forEach(function each(client) {
            client.send(message);
        });
    }
    console.log("websocket server created");
}