const upath = require('upath');
let filePath = upath.toUnix(upath.join(__dirname, 'database', 'bible-sqlite.db')).replace('app.asar/','');

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
            filename: filePath
        },
        useNullAsDefault: true
    }
};
