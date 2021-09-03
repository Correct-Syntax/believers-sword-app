"use strict";
import { app, protocol, BrowserWindow, Menu, webFrame } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
import { ipcMainEvents } from "./service/ipcMAIN/ipcMainEvents";
const isDevelopment = process.env.NODE_ENV !== "production";
const config = require("./db.config");
import log from "electron-log";
if (isDevelopment)
log.info("database location=" + (isDevelopment ? config.development.connection.filename : config.production.connection.filename) + ", Development:" + isDevelopment);

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: "app", privileges: { secure: true, standard: true } }]);

async function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 1180,
        height: 650,
        frame: false,
        minWidth: 1180,
        minHeight: 650,
        backgroundColor: "#000",
        titleBarStyle: "hidden",
        trafficLightPosition: {
            x: 10,
            y: 15
        },
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            devTools: isDevelopment
        },
        show: false,
        alwaysOnTop: true
    });

    ipcMainEvents(win);

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
        if (!process.env.IS_TEST) win.webContents.openDevTools();
    } else {
        createProtocol("app");
        await win.loadURL("app://./index.html");
    }

    if (!isDevelopment) {
        win.removeMenu();
        Menu.setApplicationMenu(Menu.buildFromTemplate([]));
    }

    win.maximize();
    setTimeout(() => {
        win.setAlwaysOnTop(false);
    }, 1000);
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
        } catch (e: any) {
            console.error("Vue Devtools failed to install:", e.toString());
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
