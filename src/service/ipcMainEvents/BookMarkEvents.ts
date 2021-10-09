import { BrowserWindow, ipcMain } from "electron";
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

const saveVersesInBookmark = async (win: BrowserWindow, payload: Array<any>) => {
    try {
        for (const item of payload) {
            let key = `${item.b}_${item.c}_${item.v}`;
            let checkIsExist = bookmarkStore.get(`bookmarks.${key}`);
            if (!checkIsExist) bookmarkStore.set(`bookmarks.${key}`, item);
        }
        return bookmarkStore.get("bookmarks");
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
};

const getVersesSavedBookmarks = async (win: BrowserWindow) => {
    try {
        return bookmarkStore.get("bookmarks");
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
};

const deleteVerseInSavedBookmarks = async (win: BrowserWindow, payload: any) => {
    try {
        bookmarkStore.delete(`bookmarks.${payload.b}_${payload.c}_${payload.v}`);
        return true;
    } catch (e) {
        return false;
    }
};

export const BookmarkEvents = (win: BrowserWindow) => {
    ipcMain.handle("saveVersesInBookmark", (event, payload) => saveVersesInBookmark(win, payload));
    ipcMain.handle("getVersesSavedBookmarks", (event, payload) => getVersesSavedBookmarks(win));
    ipcMain.handle("deleteVerseInSavedBookmarks", (event, payload) => deleteVerseInSavedBookmarks(win, payload));
};
