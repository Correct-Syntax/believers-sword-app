import store from "@/store";
import { ipcRenderer } from "electron";
const  log = require("electron-log");
export const AutoUpdateRendererEvents = (): void => {
    ipcRenderer.on("checking-for-update", () => {
        log.info("checking for updates");
    });

    ipcRenderer.on("update-available", () => {
        store.dispatch("setUpdateAvailable", true);
    });

    ipcRenderer.on("update-not-available", () => {
        store.dispatch("setUpdateAvailable", false);
    });

    ipcRenderer.on("update-error", (event, payload) => {
        store.dispatch("setUpdateError", payload);
    });

    ipcRenderer.on("update-download-progress", (event, payload) => {
        store.dispatch("setDownloadProgress", payload);
    });
};
