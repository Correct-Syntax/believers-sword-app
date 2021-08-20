module.exports = {
    publicPath: process.env.FOR_WEB === 'true'
        ? 'app'
        : '',
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                extraResources: ['database/'],
            },
            externals: ['knex', 'sqlite3'],
            nodeIntegration: true
        }
    },
}