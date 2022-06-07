import { BrowserWindow, ipcMain } from "electron";
const ElectronStore = require("electron-store");

const noteStore = new ElectronStore({
    name: "prayerList",
    defaults: {
        list: [],
        done: []
    },
    schema: {
        list: {
            type: "array"
        },
        done: {
            type: "array"
        }
    }
});

export const prayerListEvents = (win: BrowserWindow): any => {
    ipcMain.on("savePrayerListItem", (event, payload) => {
        try {
            let data = noteStore.get('list');
            noteStore.set(`list`, [payload].concat(data));
            win.webContents.send("getPrayerLists", noteStore.get("list"));
        } catch (e) {
            if (e instanceof Error) console.log(e.message);
        }
    });

    ipcMain.on('setPrayerListData', (event, { list, done }) => {
        try {
            noteStore.set('list', list);
            noteStore.set('done', done);
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

    ipcMain.on("getDoneList", () => {
        try {
            win.webContents.send("getDonePrayerList", noteStore.get("done"));
        } catch (e) {
            if (e instanceof Error) console.log(e.message);
        }
    });

    ipcMain.on("editPrayerItem", (event, payload) => {
        try {

            let list = noteStore.get('list')
            let indexOf = list.findIndex((element: any) => element.key === payload.key);

            list[indexOf].content = payload.content
            list[indexOf].date_updated = payload.date_updated

            noteStore.set('list', list)
            win.webContents.send("getPrayerLists", noteStore.get("list"));
        } catch (e) {
            if (e instanceof Error) console.log(e.message);
        }
    });

    ipcMain.on('removePrayerItem', (event, payload) => {
        try {
            let list = noteStore.get(payload.inside)
            const DataToSave = list.filter((item: any) => item.key != payload.key)

            noteStore.set(payload.inside, DataToSave)
            win.webContents.send(payload.inside == 'list' ? "getPrayerLists" : "getDonePrayerList", noteStore.get(payload.inside));
        } catch (e) {
            if (e instanceof Error) console.log(e.message);
        }
    });
};
