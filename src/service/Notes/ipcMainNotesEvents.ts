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
            win.webContents.send("getNotes", noteStore.get("notes"));
        } catch (e) {
            if (e instanceof Error) console.log(e.message);
        }
    });

    ipcMain.on("saveContent", (event, payload) => {
        try {
            if (payload.content) noteStore.set(`notes.${payload.key}.content`, payload.content);
            if (payload.title) noteStore.set(`notes.${payload.key}.title`, payload.title);
            win.webContents.send("getNotes", noteStore.get("notes"));
        } catch (e) {
            if (e instanceof Error) console.log(e.message);
        }
    });

    ipcMain.on("getNotes", () => {
        try {
            win.webContents.send("getNotes", noteStore.get("notes"));
        } catch (e) {
            if (e instanceof Error) console.log(e.message);
        }
    });
};
