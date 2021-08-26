import { ipcMain } from 'electron';
import { closeWindow, maximizeWindow, minimizeWindow } from './common/BrowserWindowEvents';
const log = require("electron-log");
const isDevelopment = process.env.NODE_ENV !== "production";
const config = require("./../../db.config");
const knex = require("knex")(isDevelopment ? config.development : config.production);

export const ipcMainEvents = (win: any) => {
    ipcMain.on("minimizeWindow", () => minimizeWindow(win));
    ipcMain.on("maximizeWindow", () => maximizeWindow(win));
    ipcMain.on("closeWindow", () => closeWindow(win));

    ipcMain.on("mainWindowLoad", () => {
        try {
            log.info("checking log");
            let result = knex.select().from("t_kjv").where({b: 1, c: 1});
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
