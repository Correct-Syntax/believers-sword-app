import { BrowserWindow } from "electron/main";
import { ipcMain } from "electron";
const logger = require("electron-log");
import { autoUpdater } from "electron-updater";

export const AutoUpdaterEvents = (win: BrowserWindow): void => {
    autoUpdater.autoDownload = false;
    autoUpdater.logger = logger;
    autoUpdater.checkForUpdates();

    autoUpdater.on("checking-for-update", () => {
        win.webContents.send("checking-for-update");
    });
    autoUpdater.on("update-available", () => {
        win.webContents.send("update-available");
    });
    autoUpdater.on("update-not-available", () => {
        win.webContents.send("update-not-available");
    });
    autoUpdater.on("error", (err) => {
        win.webContents.send("update-error", err);
    });

    ipcMain.on("confirm-download-update", () => {
        autoUpdater.downloadUpdate();
    });

    autoUpdater.on("download-progress", (progressObj) => {
        win.webContents.send("update-download-progress", progressObj);
    });

    ipcMain.on("confirm-install-update", () => {
        autoUpdater.quitAndInstall();
    });

    autoUpdater.on("update-downloaded", (info) => {
        win.webContents.send("update-downloaded", info);
    });
};
