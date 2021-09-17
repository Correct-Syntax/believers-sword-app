import { BrowserWindow, ipcMain } from "electron";
const ElectronStore = require("electron-store");

const noteStore = new ElectronStore({
    name: "bibleNotes",
    defaults: {
        notes: {}
    },
    schema: {
        notes: {
            type: "object"
        }
    }
});

export const bibleNotesEvents = (win: BrowserWindow): any => {
    ipcMain.on("saveNote", (event, payload) => {
        try {
            noteStore.set(`notes.${payload.key}`, payload);
            win.webContents.send("getNotesResult", noteStore.get("notes"));
        } catch (e) {
            if (e instanceof Error) console.log(e.message);
        }
    });

    ipcMain.on("getNotes", (event, payload) => {
        try {
            win.webContents.send("getNotesResult", noteStore.get("notes"));
        } catch (e) {
            if (e instanceof Error) console.log(e.message);
        }
    });
};
