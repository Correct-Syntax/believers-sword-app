module.exports = {
    publicPath: process.env.FOR_WEB === 'true'
    ? 'app'
    : '',
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true
        }
    },
    pages: {
        index: {
            entry: process.env.ELECTRON== 'false' ? 'src/main.ts' : 'src/electronEntryPoint.ts'
        }
    }
}