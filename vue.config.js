const isNightlyBuild = process.env.VUE_APP_NIGHTLY_BUILD === "true";
module.exports = {
    publicPath: process.env.FOR_WEB === "true" ? "app" : "",
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                productName: isNightlyBuild ? "Believers Sword Dev-Test" : "Believers Sword",
                appId: isNightlyBuild ? "com.believers-sword-dev-test.app" : "com.believers-sword.app",
                win: {
                    target: ["nsis"],
                    icon: isNightlyBuild ? "resources/icons/nightly-icon.ico" : "resources/icons/icon.ico",
                },
                nsis: {
                    oneClick: false,
                    allowToChangeInstallationDirectory: true,
                },
                extraResources: ["database/", "store/"],
                publish: ["github"],
            },
            externals: ["knex", "sqlite3"],
            nodeIntegration: true,
            mainProcessWatch: [
                "src/service/ipcMain.ts",
                "src/service/AutoUpdater",
                "src/service/ipcMainEvents",
                "src/service/linkEvents",
                "src/service/Notes",
                "src/service/PrayerLists",
                "src/service/Settings",
                "src/service/GamesEvents",
                "src/helper",
                "src/service/clipNotes",
            ],
        },
    },
    // chainWebpack: config => {
    //     config.module
    //         .rule('i18n')
    //         .resourceQuery(/blockType=i18n/)
    //         .type('javascript/auto')
    //         .use('i18n')
    //         .loader('@intlify/vue-i18n-loader')
    // }
};
