module.exports = {
    publicPath: process.env.FOR_WEB === 'true'
    ? 'app'
    : '',
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true
        }
    }
}