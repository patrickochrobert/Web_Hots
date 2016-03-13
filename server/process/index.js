module.exports = {
    execute: execute
};

var exec = require('child_process').exec;
function execute(command, callback) {
    exec(command, function (error, stdout, stderr) {
        if (error) {
            console.error(error);
        }
        callback(stdout);
    });
};
