import store from "@/store";
import { ipcRenderer } from "electron";
export const AutoUpdateRendererEvents = (): void => {
    ipcRenderer.on("checking-for-update", () => {
        console.log("checking for Updates");
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
