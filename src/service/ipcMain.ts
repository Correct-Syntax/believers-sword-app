import { ipcMainHighlightMarker } from "./ipcMainEvents/ipcMainHighlightMarker";
import { searchBibleSubmitButton } from "./ipcMainEvents/SearchBibleEvents";
import { deleteVerseInSavedBookmarks, getVersesSavedBookmarks, saveVersesInBookmark } from "./ipcMainEvents/BookMarkEvents";
import { mainWindowLoad, getBibleBooks, getBookChaptersCount, getBookInChapter, getBibleVersions } from "./ipcMainEvents/BibleEvents";
import { BrowserWindow, ipcMain } from "electron";
import { closeWindow, maximizeWindow, minimizeWindow } from "./ipcMainEvents/BrowserWindowEvents";

export const ipcMainEvents = (win: BrowserWindow) => {
    ipcMain.on("minimizeWindow", () => minimizeWindow(win));
    ipcMain.on("maximizeWindow", () => maximizeWindow(win));
    ipcMain.on("closeWindow", () => closeWindow(win));
    ipcMain.on("mainWindowLoad", () => mainWindowLoad(win));
    ipcMain.on("getBibleBooks", () => getBibleBooks(win));
    ipcMain.on("getBookChaptersCount", (event, { book, bible }) => getBookChaptersCount(win, { book, bible }));
    ipcMain.on("getBookInChapter", (event, { book, bible, chapter, versions }) => getBookInChapter(win, { book, bible, chapter, versions }));
    ipcMain.on("getBibleVersions", () => getBibleVersions(win));
    ipcMain.on("saveVersesInBookmark", (event, payload) => saveVersesInBookmark(win, payload));
    ipcMain.on("getVersesSavedBookmarks", (event, payload) => getVersesSavedBookmarks(win, payload));
    ipcMain.on("deleteVerseInSavedBookmarks", (event, payload) => deleteVerseInSavedBookmarks(win, payload));
    ipcMain.on("searchBibleSubmitButton", (event, payload) => searchBibleSubmitButton(win, payload));

    // highlight Events
    ipcMainHighlightMarker(win);

    win.on("maximize", () => {
        win.webContents.send("isMaximized");
    });
    win.on("unmaximize", () => {
        win.webContents.send("windowUnmaximized");
    });
};
