import { searchBibleSubmitButton } from './SearchBibleEvents';
import { ipcMain } from 'electron';
import { BrowserWindow } from 'electron';
const log = require("electron-log");
const isDevelopment = process.env.NODE_ENV !== "production";
const config = require("./../../db.config");
const knex = require("knex")(isDevelopment ? config.development : config.production);

const mainWindowLoad = (win: any) => {
    try {
        log.info("checking log");
        let result = knex
            .select()
            .from("t_kjv")
            .where({ b: 1, c: 1 });
        result
            .then((rows: any) => {
                win.webContents.send("resultSent", rows);
            })
            .catch((e: any) => log.error(e));
    } catch (e) {
        log.info(e);
    }
};

const getBibleBooks = (win: any) => {
    try {
        let result = knex.select().from("key_english");
        result
            .then((rows: any) => {
                win.webContents.send("resultBibleBooks", rows);
            })
            .catch((e: any) => log.error(e));
    } catch (e) {
        log.info(e);
    }
};

const getBookChaptersCount = (win: any, { book, bible }: any) => {
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
        log.info(e);
    }
};

const getBookInChapter = async (win: any, { book, bible, chapter, versions }: { versions: [] } | any) => {
    try {
        let finalResult: any[] = [];

        if (versions.length > 0) {
            for (const version of versions) {
                let result = knex
                    .select()
                    .from(version)
                    .where("b", book)
                    .where("c", chapter);

                await result.then(async (rows: any) => {
                    await rows.forEach((row: any, index: any) => {
                        let text = {
                            version: version,
                            text: row.t
                        };
                        if (finalResult[index] && finalResult[index]["versions"].length > 0) {
                            finalResult[index]["versions"].push(text);
                        } else {
                            finalResult[index] = {
                                b: row.b,
                                c: row.c,
                                v: row.v
                            };
                            finalResult[index]["versions"] = [text];
                        }
                    });
                });
            }
        }

        win.webContents.send("getBookInChapterResult", finalResult);
    } catch (e) {
        log.info(e);
    }
};

const getBibleVersions = (win: any) => {
    try {
        let result = knex.select().from("bible_version_key");

        result.then((rows: any) => {
            if (rows.length > 0) win.webContents.send("getBibleVersionsResult", rows);
        });
    } catch (e) {
        log.info(e);
    }
};


export const BibleEvents = (win: BrowserWindow) => {
    ipcMain.on("mainWindowLoad", () => mainWindowLoad(win));
    ipcMain.on("getBibleBooks", () => getBibleBooks(win));
    ipcMain.on("getBookChaptersCount", (event, { book, bible }) => getBookChaptersCount(win, { book, bible }));
    ipcMain.on("getBookInChapter", (event, { book, bible, chapter, versions }) => getBookInChapter(win, { book, bible, chapter, versions }));
    ipcMain.on("getBibleVersions", () => getBibleVersions(win));
    ipcMain.handle("searchBibleSubmitButton", (event, payload) => searchBibleSubmitButton(payload));
}