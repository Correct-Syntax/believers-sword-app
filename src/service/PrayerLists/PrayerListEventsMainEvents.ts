import { BrowserWindow, ipcMain } from "electron";
const ElectronStore = require("electron-store");

const noteStore = new ElectronStore({
    name: "prayerList",
    defaults: {
        list: {
            all: {}
        }
    },
    schema: {
        list: {
            type: "object"
        }
    }
});

export const prayerListEvents = (win: BrowserWindow): any => {
    ipcMain.on("savePrayerListItem", (event, payload) => {
        try {
            noteStore.set(`list.all.${payload.key}`, payload);
            win.webContents.send("getPrayerLists", noteStore.get("list"));
        } catch (e) {
            if (e instanceof Error) console.log(e.message);
        }
    });

    ipcMain.on("getPrayerLists", () => {
        try {
            win.webContents.send("getPrayerLists", noteStore.get("list"));
        } catch (e) {
            if (e instanceof Error) console.log(e.message);
        }
    });

    ipcMain.on("removePrayerItem", (event, payload) => {
        try {
            noteStore.delete(`list.${payload.folder}.${payload.key}`);
            win.webContents.send("getPrayerLists", noteStore.get("list"));
        } catch (e) {
            if (e instanceof Error) console.log(e.message);
        }
    });

    ipcMain.on("editPrayerItem", (event, payload) => {
        try {
            noteStore.set(`list.${payload.key}.content`, payload.content);
            noteStore.set(`list.${payload.key}.date_updated`, payload.date_updated);
            win.webContents.send("getPrayerLists", noteStore.get("list"));
        } catch (e) {
            if (e instanceof Error) console.log(e.message);
        }
    });
};
