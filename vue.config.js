module.exports = {
    publicPath: process.env.FOR_WEB === 'true'
        ? 'app'
        : '',
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                productName: "Believers Sword",
                appId: "com.believers-sword.app",
                win: {
                    target: [
                        "nsis",
                    ],
                    icon: "resources/icons/icon.ico"
                },
                nsis: {
                    oneClick: false,
                    allowToChangeInstallationDirectory: true,
                },
                extraResources: ['database/'],
                publish: ['github']
            },
            externals: ['knex', 'sqlite3'],
            nodeIntegration: true
        }
    },
}