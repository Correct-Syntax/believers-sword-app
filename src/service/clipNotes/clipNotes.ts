import { ElectronLog } from "electron-log";
import { ipcMain } from "electron";
import Knex from "knex";
const log: ElectronLog = require("electron-log");
const isDevelopment = process.env.NODE_ENV !== "production";
const config = require("./../../db.config");
const storeDB: Knex = require("knex")(isDevelopment ? config.store_dev : config.store);

export const clipNoteEvents = (): void => {
    ipcMain.handle("getClipNotes", async (event, args) => {
        try {
            let result = storeDB.select().from("clip_notes");
            if (args && args.b) result.where("b", args.b);
            if (args && args.c) result.where("c", args.c);
            if (args && args.v) result.where("v", args.v);

            return await result.then((rows: Array<any>) => {
                return rows.length > 0 ? rows.reduce((acc: any, curr: any) => ((acc[`${curr.b}_${curr.c}_${curr.v}`] = curr), acc), {}) : {};
            });
        } catch (e) {
            if (e instanceof Error) {
                log.error(e.message);
            }
        }
    });

    ipcMain.handle("addClipNote", async (event, args) => {
        try {
            if (!args) {
                return false;
            }
            let result = storeDB("clip_notes");
            let checkIfExist = await storeDB("clip_notes")
                .where({
                    b: args.b,
                    c: args.c,
                    v: args.v
                })
                .then((raw: any) => raw);

            if (checkIfExist.length > 0) {
                return await result
                    .where({
                        b: args.b,
                        c: args.c,
                        v: args.v
                    })
                    .update({
                        color: args.color ? args.color : "default",
                        note: args.notes
                    })
                    .then((raw: any) => raw);
            } else {
                if (typeof args === "object") {
                    result.insert({ b: args.b, c: args.c, v: args.v, book_name: args.book_name ? args.book_name : args.bookName, note: args.note, color: args.color });
                }
                return await result.then((rows: any) => {
                    return rows;
                });
            }
        } catch (e) {
            if (e instanceof Error) {
                log.error(e.message);
            }
        }
    });

    ipcMain.handle("deleteClipNote", (event, args) => {
        try {
        } catch (e) {
            if (e instanceof Error) {
                log.error(e.message);
            }
        }
    });
};
