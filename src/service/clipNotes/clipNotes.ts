import { ElectronLog } from "electron-log";
import { ipcMain } from "electron";
import { Knex } from "knex";
import ElectronStore from "electron-store";
const log: ElectronLog = require("electron-log");
const isDevelopment = process.env.NODE_ENV !== "production";
const config = require("./../../db.config");
const storeDB: Knex = require("knex")(isDevelopment ? config.store_dev : config.store);

const clipNotesStoreBackUp = new ElectronStore({
    name: "clipNotes",
    defaults: {
        clipNoteBackup: []
    },
    schema: {
        clipNoteBackup: {
            type: "array"
        }
    }
});

const storeThenBackUp = async () => {
    try {
        const result = storeDB("clip_notes").select("b", "c", "v", "book_name", "color", "note");
        await result.then(async (raws: Array<any>) => {
            const backupClipNotes: Array<any> | any = clipNotesStoreBackUp.get("clipNoteBackup");
            if (raws.length <= 0 && backupClipNotes.length > 0) {
                await storeDB("clip_notes")
                    .insert(backupClipNotes)
                    .then(() => {
                        log.info("Restored Clip Note Backup.");
                    })
                    .catch((e: Error) => log.error(e.message));
            }
        });
    } catch (e) {
        if (e instanceof Error) log.error(e.message);
    }
};

export const clipNoteEvents = (): void => {
    storeThenBackUp();

    const backup = () => {
        try {
            const result = storeDB("clip_notes").select();
            result.then((raws: Array<any>) => {
                if (raws.length) {
                    clipNotesStoreBackUp.set("clipNoteBackup", raws);
                }
            });
        } catch (e) {
            if (e instanceof Error) log.error(e.message);
        }
    };

    ipcMain.handle("getClipNotes", async (event, args) => {
        try {
            const result = storeDB.select().from("clip_notes");
            const count = storeDB.select().from("clip_notes");
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

            const data = await result.then((rows: Array<any>) => {
                return rows.length > 0 ? rows.reduce((acc: any, curr: any) => ((acc[`${curr.b}_${curr.c}_${curr.v}`] = curr), acc), {}) : {};
            });

            const getCount = await count.count("id as count").then((data: any) => data[0].count);

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
            const result = storeDB("clip_notes");
            const checkIfExist = await storeDB("clip_notes")
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
                        note: args.note
                    })
                    .then((raw: any) => {
                        backup();
                        return raw;
                    });
            } else {
                if (typeof args === "object") {
                    result.insert({ b: args.b, c: args.c, v: args.v, book_name: args.book_name ? args.book_name : args.bookName, note: args.note, color: args.color });
                }
                return await result.then((rows: any) => {
                    backup();
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
                const result = storeDB("clip_notes")
                    .where({ b: args.b, c: args.c, v: args.v })
                    .delete();

                return await result.then((row: Array<any> | number) => {
                    const clipNoteBackUp: Array<any> | any = clipNotesStoreBackUp.get('clipNoteBackup')

                    if (clipNoteBackUp && typeof clipNoteBackUp == 'object' && clipNoteBackUp.length > 0) {
                        const indexToDelete = clipNoteBackUp.findIndex((clipNote: any) => clipNote.b == args.b && clipNote.c == args.c && clipNote.v == args.v)
                        delete clipNoteBackUp[indexToDelete];

                        clipNotesStoreBackUp.set('clipNoteBackup', clipNoteBackUp)
                    }

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
