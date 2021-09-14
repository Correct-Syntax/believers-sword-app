const log = require("electron-log");
const isDevelopment = process.env.NODE_ENV !== "production";
const config = require("./../../db.config");
const storeDB = require("knex")(isDevelopment ? config.store_dev : config.store);
const ElectronStore = require("electron-store");

const electronStore = new ElectronStore({
    name: "bibleBookmark",
    defaults: {
        bookmarks: []
    },
    schema: {
        bookmarks: {
            type: "array"
        }
    }
});

const electronStoreBookMarkObjPath = "bookmarks";

export const saveVersesInBookmark = async (win: any, payload: Array<any>) => {
    try {
        for (const item of payload) {
            await storeDB("bookmarks")
                .where({ book: item.b, chapter: item.c, verse: item.v })
                .first("id")
                .then(async (raw: any) => {
                    if (!raw) {
                        await storeDB("bookmarks").insert({
                            book: item.b,
                            chapter: item.c,
                            verse: item.v,
                            book_text: item.b_text,
                            date_created: new Date()
                        });
                    }
                });
        }
        await getVersesSavedBookmarks(win);
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
};

export const getVersesSavedBookmarks = async (win: any, payload = { limit: 100, page: 1, book: null, chapter: null }) => {
    try {
        let result = storeDB("bookmarks")
            .limit(payload.limit)
            .offset((payload.page - 1) * payload.limit)
            .orderBy(["book", "chapter", "verse"]);

        let count = storeDB("bookmarks")
            .first()
            .count("id as count");

        if (payload.book) {
            result.where("book", payload.book);
            count.where("book", payload.book);
        }

        if (payload.chapter) {
            result.where("chapter", payload.chapter);
            count.where("chapter", payload.chapter);
        }
        let dataResponse: any = {};
        await result.then((raws: Array<any>) => {
            dataResponse["data"] = raws;
        });
        await count.then((raw: Array<any>) => {
            dataResponse["count"] = raw;
        });
        win.webContents.send("getVersesInBookmarkResult", dataResponse);
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
};

export const deleteVerseInSavedBookmarks = (win: any, payload: any) => {
    try {
        let getCurrentBookmarks = electronStore.get(electronStoreBookMarkObjPath);
        let index = getCurrentBookmarks.findIndex((x: any) => x.b == payload.b && x.c == payload.c && x.v == payload.v);
        getCurrentBookmarks.splice(index, 1);
        electronStore.set(electronStoreBookMarkObjPath, getCurrentBookmarks);
        win.webContents.send("getVersesInBookmarkResult", getCurrentBookmarks);
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
};
