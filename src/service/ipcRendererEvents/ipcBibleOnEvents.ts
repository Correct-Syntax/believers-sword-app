import { ipcRenderer } from "electron";
import store from "@/store";

export const bibleEventOnRenderer = async () => {
    await ipcRenderer.invoke("getBibleBooks").then((args: any) => {
        store.dispatch("setBibleBooks", args);
    });
    ipcRenderer.on("resultBibleBooks", (event, result) => store.dispatch("setBibleBooks", result));
    ipcRenderer.on("getBookChaptersCountResult", (event, result) =>
        store.dispatch("setBookSelectedChapterCount", result.length)
    );
    ipcRenderer.on("getBookInChapterResult", (event, result) => store.dispatch("setViewBookChapter", result));
    ipcRenderer.on("getBibleVersionsResult", (event, result) =>
        store.dispatch("getBibleVersions", { getInStore: true, data: result })
    );
};
