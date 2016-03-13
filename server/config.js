module.exports = configuration();

function configuration() {
    return {
        basePath: __dirname.substring(0, __dirname.lastIndexOf('/'))
    }
}