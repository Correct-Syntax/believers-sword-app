import { linkEvents } from "./linkEvents/linkEvents";
import { prayerListEvents } from "./PrayerLists/PrayerListEventsMainEvents";
import { ipcMainHighlightMarker } from "./ipcMainEvents/ipcMainHighlightMarker";
import { searchBibleSubmitButton } from "./ipcMainEvents/SearchBibleEvents";
import { deleteVerseInSavedBookmarks, getVersesSavedBookmarks, saveVersesInBookmark } from "./ipcMainEvents/BookMarkEvents";
import { mainWindowLoad, getBibleBooks, getBookChaptersCount, getBookInChapter, getBibleVersions } from "./ipcMainEvents/BibleEvents";
import { BrowserWindow, ipcMain } from "electron";
import { windowBrowserEvents } from "./ipcMainEvents/BrowserWindowEvents";
import { bibleNotesEvents } from "./Notes/ipcMainNotesEvents";

export const ipcMainEvents = (win: BrowserWindow) => {
    // browser Window Events
    windowBrowserEvents(win);

    ipcMain.on("mainWindowLoad", () => mainWindowLoad(win));
    ipcMain.on("getBibleBooks", () => getBibleBooks(win));
    ipcMain.on("getBookChaptersCount", (event, { book, bible }) => getBookChaptersCount(win, { book, bible }));
    ipcMain.on("getBookInChapter", (event, { book, bible, chapter, versions }) => getBookInChapter(win, { book, bible, chapter, versions }));
    ipcMain.on("getBibleVersions", () => getBibleVersions(win));
    ipcMain.on("saveVersesInBookmark", (event, payload) => saveVersesInBookmark(win, payload));
    ipcMain.on("getVersesSavedBookmarks", (event, payload) => getVersesSavedBookmarks(win));
    ipcMain.on("deleteVerseInSavedBookmarks", (event, payload) => deleteVerseInSavedBookmarks(win, payload));
    ipcMain.on("searchBibleSubmitButton", (event, payload) => searchBibleSubmitButton(win, payload));

    // highlight Events
    ipcMainHighlightMarker(win);

    // notes
    bibleNotesEvents(win);

    // prayer list
    prayerListEvents(win);

    // link events
    linkEvents();
};
