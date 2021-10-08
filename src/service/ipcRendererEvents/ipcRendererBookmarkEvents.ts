import store from "@/store";
import { ipcRenderer } from "electron";

export const bibleVerseBookmarkEvents = () => {
    ipcRenderer.on("getVersesInBookmarkResult", (event, result) => store.dispatch("getVersesInBookmarkResult", result));
};
