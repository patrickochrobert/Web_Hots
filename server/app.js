var express = require('express');
var app = express();
var config = require('./config.js');
var routing = require('./routing/index.js').setupRoute;

routing(app);
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
