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
                extraResources: [
                    'database/',
                    process.env.DEVELOPMENT_MODE === 'true' ? 'store/' : 'store_dev/'
                ],
                publish: ['github']
            },
            externals: ['knex', 'sqlite3'],
            nodeIntegration: true,
            mainProcessWatch: [
                'src/service/ipcMain.ts',
                'src/service/AutoUpdater',
                'src/service/ipcMainEvents',
                'src/service/linkEvents',
                'src/service/Notes',
                'src/service/PrayerLists',
                'src/service/Settings',
                'src/service/GamesEvents',
                "src/helper",
                "src/service/clipNotes"
            ],
        }
    },
}