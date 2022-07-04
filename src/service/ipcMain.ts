import { clipNoteEvents } from './clipNotes/clipNotes';
import { memoryFlipCardGameEvents } from "./GamesEvents/MemoryCardGame/MemoryCardGame";
import { linkEvents } from "./linkEvents/linkEvents";
import { prayerListEvents } from "./PrayerLists/PrayerListEventsMainEvents";
import { ipcMainHighlightMarker } from "./ipcMainEvents/ipcMainHighlightMarker";
import { BookmarkEvents } from "./ipcMainEvents/BookMarkEvents";
import { BibleEvents } from "./ipcMainEvents/BibleEvents";
import { BrowserWindow } from "electron";
import { windowBrowserEvents } from "./ipcMainEvents/BrowserWindowEvents";
import { bibleNotesEvents } from "./Notes/ipcMainNotesEvents";
import { settingsEvents } from "./Settings/Settings";
import { dictionaryEvents } from './Dictionary/dictionary';

export const ipcMainEvents = (win: BrowserWindow) => {
    // browser Window Events
    windowBrowserEvents(win);

    // bible events
    BibleEvents(win);

    // Bookmark Events
    BookmarkEvents(win);

    // highlight Events
    ipcMainHighlightMarker(win);

    // notes
    bibleNotesEvents(win);

    // prayer list
    prayerListEvents(win);

    // link events
    linkEvents();

    // configuration events
    settingsEvents();

    //memoryFlipCardGameEvents
    memoryFlipCardGameEvents();

    // clip Notes Events
    clipNoteEvents();

    // dictionary events
    dictionaryEvents();
};
