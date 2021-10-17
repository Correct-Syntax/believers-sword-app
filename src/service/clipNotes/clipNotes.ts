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
            let count = storeDB.select().from("clip_notes");
            if (args && args.b) {
                result.where("b", args.b);
                count.where("b", args.b);
            }
            if (args && args.c) {
                result.where("c", args.c);
                count.where("c", args.c);
            }
            if (args && args.v) {
                result.where("v", args.v);
                count.where("v", args.v);
            }
            if (args && args.limit) result.limit(args.limit);
            if (args && args.offset) result.offset(args.offset);
            if (args && args.orderBy) result.orderBy(args.orderBy);

            result.orderBy("c");
            result.orderBy("v");

            let data = await result.then((rows: Array<any>) => {
                return rows.length > 0 ? rows.reduce((acc: any, curr: any) => ((acc[`${curr.b}_${curr.c}_${curr.v}`] = curr), acc), {}) : {};
            });

            let getCount = await count.count("id as count").then((data: any) => data[0].count);

            return {
                data: data,
                count: getCount
            };
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

            console.log(args.color);

            if (checkIfExist.length > 0) {
                return await result
                    .where({
                        b: args.b,
                        c: args.c,
                        v: args.v
                    })
                    .update({
                        color: args.color ? args.color : "default",
                        note: args.note
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

    ipcMain.handle("deleteClipNote", async (event, args) => {
        try {
            if (args && args.b && args.c && args.v) {
                let result = storeDB("clip_notes")
                    .where({ b: args.b, c: args.c, v: args.v })
                    .delete();

                return await result.then((row: Array<any> | number) => {
                    return row;
                });
            }

            return false;
        } catch (e) {
            if (e instanceof Error) {
                log.error(e.message);
            }
        }
    });
};
