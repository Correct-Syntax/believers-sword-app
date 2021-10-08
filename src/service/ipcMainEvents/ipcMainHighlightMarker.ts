import { ipcMain } from "electron";
import { BrowserWindow } from "electron/main";
const ElectronStore = require("electron-store");

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

export const ipcMainHighlightMarker = (win: BrowserWindow): void => {
    ipcMain.handle("getBibleVerseHighlight", () => electronStore.get("highlights"));
    ipcMain.handle("saveBibleVerseHighlight", (event, payload): any | void => {
        try {
            let hasHighlight = payload.content.includes("HasHighlightSpan");
            if (hasHighlight) electronStore.set(`highlights.${payload.key}`, payload);
            else electronStore.delete(`highlights.${payload.key}`);
            return electronStore.get("highlights");
        } catch (e) {
            console.log(e);
        }
    });
};
