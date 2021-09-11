import store from "@/store";
import { ipcRenderer } from "electron";

export const HighlightMarkerEvent = (): void => {
    ipcRenderer.on("getBibleVerseHighlightResult", (event, payload) => {
        store.dispatch("setHighlights", payload);
    });

    ipcRenderer.send("getBibleVerseHighlight");
};
