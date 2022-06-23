"use strict";
import { contextMenus } from "./service/ContextMenu/ContextMenu";
import { appSettingsStore } from "./service/ElectronStoreSchemma/SettingSchema";
import { AutoUpdaterEvents } from "./service/AutoUpdater/AutoUpdaterMainProcessEvent";
import { app, protocol, BrowserWindow, Menu, screen } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
import { ipcMainEvents } from "./service/ipcMain";
import { BrowserWindowConstructorOptions } from "electron";
const isDevelopment = process.env.NODE_ENV !== "production";

protocol.registerSchemesAsPrivileged([{ scheme: "app", privileges: { secure: true, standard: true } }]);

async function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const appBounds: any = appSettingsStore.get("setting.appBounds");
    const windowBrowserOptions: BrowserWindowConstructorOptions = {
        width: 1190,
        height: 660,
        frame: false,
        minWidth: 1180,
        minHeight: 650,
        backgroundColor: "#000",
        titleBarStyle: "hidden",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            devTools: isDevelopment
        },
        show: false,
        alwaysOnTop: !isDevelopment
    };

    // Sett the saved appBounds state
    if (appBounds !== undefined && appBounds !== null) Object.assign(windowBrowserOptions, appBounds);
    const win = new BrowserWindow(windowBrowserOptions);

    // Need to Initialize Before Loading The App
    ipcMainEvents(win);

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
        if (!process.env.IS_TEST) win.webContents.openDevTools();
    } else {
        createProtocol("app");
        await win.loadURL("app://./index.html");
    }

    // remove the menus
    if (!isDevelopment) {
        win.removeMenu();
        Menu.setApplicationMenu(Menu.buildFromTemplate([]));
    }

    if (appBounds !== undefined && appBounds !== null && appBounds.width > width && appBounds.height > height) win.maximize();
    else win.show();

    setTimeout(() => {
        win.setAlwaysOnTop(false);
    }, 1000);

    if (!isDevelopment) AutoUpdaterEvents(win);

    contextMenus(win);
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            await installExtension(VUEJS3_DEVTOOLS);
        } catch (e) {
            // eslint-disable-next-line
            console.error(e);
        }
    }
    createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === "win32") {
        process.on("message", data => {
            if (data === "graceful-exit") {
                app.quit();
            }
        });
    } else {
        process.on("SIGTERM", () => {
            app.quit();
        });
    }
}
