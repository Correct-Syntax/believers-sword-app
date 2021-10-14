import { ipcMain } from "electron";
import { ElectronLog } from "electron-log";
import ElectronStore from "electron-store";
const store = require("electron-store");
const log: ElectronLog = require("electron-log");

const settingStore: ElectronStore = new store({
    name: "configuration",
    defaults: {
        settings: {},
        primaryColors: {
            primaryColorDark: "#3cb1ff",
            primaryColorLight: "#008fee"
        }
    },
    schema: {
        settings: {
            type: "object"
        },
        primaryColors: {
            type: "object"
        }
    }
});

export const settingsEvents = (): void => {
    ipcMain.handle("changePrimaryTheme", (event, args) => {
        try {
            settingStore.set("primaryColors", args);

            return settingStore.get("primaryColors");
        } catch (e) {
            if (e instanceof Error) log.error(e.message);
        }
    });
    ipcMain.handle("getPrimaryColors", (event, args) => {
        try {
            return settingStore.get("primaryColors");
        } catch (e) {
            if (e instanceof Error) log.error(e.message);
        }
    })
};
