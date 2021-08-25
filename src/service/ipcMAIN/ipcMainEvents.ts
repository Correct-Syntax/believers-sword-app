import { ipcMain } from 'electron';
const log = require("electron-log");
const isDevelopment = process.env.NODE_ENV !== "production";
const config = require("./../../db.config");
const knex = require("knex")(isDevelopment ? config.development : config.production);

export const ipcMainEvents = (win: any) => {
    ipcMain.on("minimizeWindow", () => {
        win.minimize();
    });
    ipcMain.on("maximizeWindow", () => {
        if (win.isMaximized()) {
            win.restore();
            return;
        } else {
            win.maximize();
        }
    });
    ipcMain.on("closeWindow", () => {
        win.destroy();
    });

    ipcMain.on("mainWindowLoad", () => {
        console.log("went to electron");

        try {
            log.info("checking log");
            let result = knex.select().from("bible_version_key");
            result
                .then((rows: any) => {
                    win.webContents.send("resultSent", rows);
                })
                .catch((e: any) => log.error(e));
        } catch (e) {
            log.info(e.message);
        }
    });
};
