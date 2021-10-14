import { appSettingsStore } from "../../helper/electronStore/SettingSchema";
import { BrowserWindow, ipcMain, screen } from "electron";

const minimizeWindow = (win: any) => {
    win.minimize();
};

const maximizeWindow = (win: BrowserWindow): boolean | void => {
    try {
        if (win.isMaximized()) {
            const { width, height } = screen.getPrimaryDisplay().workAreaSize;
            const appBounds: any = appSettingsStore.get("setting.appBounds");

            if (appBounds !== undefined && appBounds !== null && appBounds.width > width && appBounds.height > height) {
                win.unmaximize();
                win.setSize(1180, 650, false);
                win.center();
            } else win.restore();
        } else win.maximize();
        return win.isMaximized();
    } catch (e) {
        console.log(e);
    }
};

const closeWindow = (win: BrowserWindow): void => {
    const appBounds = win.getBounds();
    appSettingsStore.set({
        setting: {
            appBounds
        }
    });
    win.destroy();
};

export const windowBrowserEvents = (win: BrowserWindow) => {
    ipcMain.on("minimizeWindow", () => minimizeWindow(win));
    ipcMain.handle("maximizeWindow", () => maximizeWindow(win));
    ipcMain.on("closeWindow", () => closeWindow(win));
    ipcMain.handle("isWindowBrowserMaximized", () => {
        return win.isMaximized();
    });
};
