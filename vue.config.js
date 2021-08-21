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
                        {
                            target: "nsis",
                            arch: [
                                "x64",
                                "ia32"
                            ]
                        }
                    ],
                    icon: "resources/icons/icon.ico"
                },
                nsis: {
                    oneClick: false,
                    allowToChangeInstallationDirectory: true,
                },
                extraResources: ['database/'],
            },
            externals: ['knex', 'sqlite3'],
            nodeIntegration: true
        }
    },
}