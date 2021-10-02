import { BrowserWindow, ipcMain } from "electron";

export const linkEvents = () => {
    ipcMain.on("clickExternalLink", async (event, payload) => {
        if (payload.windowed) {
            let window = new BrowserWindow({
                width: 1200,
                minWidth: 1000,
                height: 800,
                minHeight: 800,
                autoHideMenuBar: true,
                title: payload.title ? payload.title : "Believers Sword App"
            });

            await window.loadURL(payload.link);
        } else {
            require("electron").shell.openExternal(payload.link);
        }
    });
};
