import { ipcMain } from "electron";
const log = require("electron-log");
const isDevelopment = process.env.NODE_ENV !== "production";
const config = require("./../../../db.config");
const knex = require("knex")(isDevelopment ? config.development : config.production);

export const ipcMainBibleEvents = (win: any) => {
    ipcMain.on("getBibleBooks", () => {
        try {
            let result = knex.select().from("key_english");
            result
                .then((rows: any) => {
                    win.webContents.send("resultBibleBooks", rows);
                })
                .catch((e: any) => log.error(e));
        } catch (e) {
            log.info(e.message);
        }
    });

    ipcMain.on("getBookChaptersCount", (event, { book, bible }) => {
        try {
            let result = knex
                .select("c")
                .from(bible)
                .where("b", book);

            result.then((rows: any) => {
                let sendData = Object.keys(rows.reduce((r: any, { c }: any) => ((r[c] = ""), r), {}));
                if (rows.length > 0) win.webContents.send("getBookChaptersCountResult", sendData);
            });
        } catch (e) {
            log.info(e.message);
        }
    });

    ipcMain.on("getBookInChapter", (event, { book, bible, chapter }) => {
        try {
            let result = knex
                .select()
                .from(bible)
                .where("b", book)
                .where("c", chapter);

            result.then((rows: any) => {
                if (rows.length > 0) win.webContents.send("getBookInChapterResult", rows);
            });
        } catch (e) {
            log.info(e.message);
        }
    });
};
