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

export const HighlightMarker = (win: BrowserWindow): void => {
    ipcMain.on("getBibleVerseHighlight", () => {
        win.webContents.send("getBibleVerseHighlightResult", electronStore.get("highlights"));
    });

    ipcMain.on("saveBibleVerseHighlight", (event, payload) => {
        try {
            let hasHighlight = payload.content.includes("HasHighlightSpan");

            if (hasHighlight) {
                electronStore.set(`highlights.${payload.key}`, payload);
            } else {
                electronStore.delete(`highlights.${payload.key}`);
            }

            win.webContents.send("getBibleVerseHighlightResult", electronStore.get("highlights"));
        } catch (e) {
            console.log(e);
        }
    });
};
