import { MemoryCardGameStore } from "./../../../helper/electronStore/MemoryCardGame";
import { ipcMain } from "electron";
import { ElectronLog } from "electron-log";
const log: ElectronLog = require("electron-log");

export const memoryFlipCardGameEvents = () => {
    ipcMain.handle("getFlipCard", (event, args) => {
        try {
            return MemoryCardGameStore.get("flipCards");
        } catch (e) {
            if (e instanceof Error) log.error(e.message);
        }
    });

    ipcMain.handle("addFlipCard", (event, args) => {
        try {
            MemoryCardGameStore.set(`flipCards.${args.key}`, args);
            return true;
        } catch (e) {
            if (e instanceof Error) log.error(e.message);
        }
    });

    ipcMain.handle("deleteFlipCard", (event, keyToDelete) => {
        try {
            MemoryCardGameStore.delete(`flipCards.${keyToDelete}`);
            return true;
        } catch (e) {
            if (e instanceof Error) log.error(e);
        }
    });
};
