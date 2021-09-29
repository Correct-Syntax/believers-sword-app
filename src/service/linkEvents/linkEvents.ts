import { BrowserWindow, ipcMain } from "electron";

export const linkEvents = () => {
    ipcMain.on("clickExternalLink", async (event, payload) => {
        if (payload.windowed) {
            let window = new BrowserWindow({
                width: 1000,
                minWidth: 1000,
                height: 800,
                minHeight: 800,
                autoHideMenuBar: true,
            });

            await window.loadURL(payload.link);
        } else {
            require("electron").shell.openExternal(payload.link);
        }
    });
};
