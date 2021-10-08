import { BrowserWindow } from "electron";
const ElectronStore = require("electron-store");

const bookmarkStore = new ElectronStore({
    name: "bibleBookmark",
    defaults: {
        bookmarks: {}
    },
    schema: {
        bookmarks: {
            type: "object"
        }
    }
});

export const saveVersesInBookmark = async (win: BrowserWindow, payload: Array<any>) => {
    try {
        for (const item of payload) {
            let key = `${item.b}_${item.c}_${item.v}`;
            let checkIsExist = bookmarkStore.get(`bookmarks.${key}`);
            if (!checkIsExist) bookmarkStore.set(`bookmarks.${key}`, item);
        }
        win.webContents.send("getVersesInBookmarkResult", bookmarkStore.get("bookmarks"));
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
};

export const getVersesSavedBookmarks = async (win: BrowserWindow) => {
    try {
        win.webContents.send("getVersesInBookmarkResult", bookmarkStore.get("bookmarks"));
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
};

export const deleteVerseInSavedBookmarks = async (win: BrowserWindow, payload: any) => {
    try {
        bookmarkStore.delete(`bookmarks.${payload.b}_${payload.c}_${payload.v}`);
        win.webContents.send("getVersesInBookmarkResult", bookmarkStore.get("bookmarks"));
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
};
