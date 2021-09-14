const upath = require('upath');

module.exports = {
    development: {
        client: "sqlite3",
        connection: {
            filename: "./database/bible-sqlite.db"
        },
        useNullAsDefault: true
    },
    production: {
        client: "sqlite3",
        connection: {
            filename: upath.toUnix(upath.join(__dirname, 'database', 'bible-sqlite.db')).replace('app.asar/','')
        },
        useNullAsDefault: true
    },
    store_dev: {
        client: "sqlite3",
        connection: {
            filename: "./store_dev/store.db"
        },
        useNullAsDefault: true
    },
    store: {
        client: "sqlite3",
        connection: {
            filename: upath.toUnix(upath.join(__dirname, 'store', 'store.db')).replace('app.asar/','')
        },
        useNullAsDefault: true
    },
};
