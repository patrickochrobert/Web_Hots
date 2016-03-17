module.exports = configuration();
var path = require('path');

function configuration() {
    var l1 = __dirname.lastIndexOf('/');
    var l2 = __dirname.lastIndexOf('\\');
    
    var dir = __dirname.substring(0, Math.max(l1,l2));
    return {
        basePath: dir
    }
}