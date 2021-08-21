module.exports = {
    publicPath: process.env.FOR_WEB === 'true'
        ? 'app'
        : '',
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                appId: "com.believers-sword.app",
                win: {
                    target: [
                        {
                            target: "nsis",
                            arch: [
                                "x64",
                                "ia32"
                            ]
                        },
                        "msi"
                    ]
                },
                nsis: {
                    oneClick: false,
                    allowToChangeInstallationDirectory: true,
                },
                msi: {
                    oneClick: false,
                    allowToChangeInstallationDirectory: true,
                },
                directories: {
                    buildResources: "resources"
                },
                // files: ['resources/**/*',"dist_electron/bundled/**/*"],
            },
            extraResources: ['database/'],
            externals: ['knex', 'sqlite3'],
            nodeIntegration: true
        }
    },
}