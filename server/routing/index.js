module.exports = {
    setupRoute: setup,
}

var express = require('express');
var execute = require('../process/index.js').execute;
var configuration = require('../config.js');

function setup(app) {
    setupStatic(app);
    setupScripts(app);
    require('./chat.js').setup(app);
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
