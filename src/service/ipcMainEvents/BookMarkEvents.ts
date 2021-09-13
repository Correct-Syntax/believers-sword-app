const log = require("electron-log");
const isDevelopment = process.env.NODE_ENV !== "production";
const config = require("./../../db.config");
const knex = require("knex")(isDevelopment ? config.development : config.production);
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

export const saveVersesInBookmark = (win: any, payload: Array<any>) => {
    try {
        let getCurrentBookmarks = electronStore.get(electronStoreBookMarkObjPath);
        let mergeBookMark = payload.concat(getCurrentBookmarks);
        let add: Array<any> = [];

        mergeBookMark.filter(function(item) {
            var i = add.findIndex(x => x.b == item.b && x.c == item.c && x.v == item.v);
            if (i <= -1) {
                add.push(item);
            }
            return null;
        });

        add.sort((a, b) => (a.b_text < b.b_text ? -1 : a.b_text > b.b_text ? 1 : 0));
        electronStore.set(electronStoreBookMarkObjPath, add);
        win.webContents.send("getVersesInBookmarkResult", add);
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
};

export const getVersesSavedBookmarks = (win: any) => {
    try {
        let getCurrentBookmarks = electronStore.get(electronStoreBookMarkObjPath);
        win.webContents.send("getVersesInBookmarkResult", getCurrentBookmarks);
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
