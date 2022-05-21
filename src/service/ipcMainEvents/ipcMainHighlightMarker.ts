import { ipcMain } from "electron";
import { BrowserWindow } from "electron/main";
import Knex from "knex";
const isDevelopment = process.env.NODE_ENV !== "production";
const ElectronStore = require("electron-store");
const config = require("./../../db.config");
const storeDB: Knex = require("knex")(isDevelopment ? config.store_dev : config.store);
import { ElectronLog } from "electron-log";
const log: ElectronLog = require("electron-log");

const electronStore = new ElectronStore({
    name: "bibleHighlights",
    defaults: {
        highlights: {}
    },
    schema: {
        highlights: {
            type: "object"
        }
    }
});

const storeMarkersThenBackUp = async () => {
    try {
        let result = storeDB("highlights").select("*");
        await result.then(async (raws: Array<any>) => {
            let backupHighlights: Array<any> | any = electronStore.get("highlights");
            // console.log(Object.entries(backupHighlights))
            if (raws.length <= 0 && Object.entries(backupHighlights).length > 0) {

                let toBackUp = [];
                let backupHighlightsToObjectEntries: any = Object.entries(backupHighlights)

                // set The Data to database
                for (const [key, value] of backupHighlightsToObjectEntries) {
                    toBackUp.push({
                        key: value.key,
                        version: value.bibleVersion,
                        book: parseInt(value.bookNumber),
                        chapter: parseInt(value.chapterNumber),
                        verse: parseInt(value.verseNumber),
                        content: value.content,
                        date_created: new Date()
                    });
                }

                await storeDB("highlights")
                    .insert(toBackUp)
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

const getBibleVerseHighlight = async (args: any = null) => {
    try {

        let result = storeDB.select().from("highlights");
        let count = storeDB.select().from("highlights");
        if (args && args.b && args.b != 'all') {
            result.where("book", args.b);
            count.where("book", args.b);
        }
        if (args && args.c) {
            result.where("chapter", args.c);
            count.where("chapter", args.c);
        }
        if (args && args.v) {
            result.where("verse", args.v);
            count.where("verse", args.v);
        }
        if (args && args.limit) result.limit(args.limit);
        if (args && args.offset) result.offset(args.offset);
        if (args && args.orderBy) result.orderBy(args.orderBy);

        if (args && args.search) {
            result.where('content', 'like', `%${args.search}%`)
            count.where('content', 'like', `%${args.search}%`)
        }

        result.orderBy("chapter");
        result.orderBy("verse");

        let data = await result.then((rows: Array<any>) => {
            return rows.length > 0 ? rows.reduce((acc: any, curr: any) => ((acc[`${curr.key}`] = curr), acc), {}) : {};
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
        return {}
    }
}

export const ipcMainHighlightMarker = async (win: BrowserWindow): Promise<void> => {
    await storeMarkersThenBackUp();

    ipcMain.handle("getBibleVerseHighlight", (event, args: any) => {
        return getBibleVerseHighlight(args);
    });

    ipcMain.handle("saveBibleVerseHighlight", async (event, payload): Promise<any> => {
        try {
            // save to electronStore
            let hasHighlight = payload.content.includes("HasHighlightSpan");
            if (hasHighlight) {
                electronStore.set(`highlights.${payload.key}`, payload);

                // save to database
                await storeDB('highlights').insert({
                    key: payload.key,
                    version: payload.bibleVersion,
                    book: parseInt(payload.bookNumber),
                    chapter: parseInt(payload.chapterNumber),
                    verse: parseInt(payload.verseNumber),
                    content: payload.content,
                    date_created: new Date()

                }).then(() => {
                    console.log('success inserting highlight.')
                }).catch((e: Error) => console.log(e));
            }
            else {
                electronStore.delete(`highlights.${payload.key}`);
            }

            //return data
            // return electronStore.get("highlights");
            return getBibleVerseHighlight();
        } catch (e) {
            console.log(e);
        }
    });
};
