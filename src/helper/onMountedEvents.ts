import { setStore } from "./onMountedEvents/SetStore";
import { getBookChaptersCountResult, getBookInChapterResult, resultBibleBooks } from "./ipcRendererOn/ipcBibleOnEvents";
import { ipcRenderer } from "electron";

// eslint-disable-next-line
export const setReadBiblePage = async (store: any = null): Promise<void> => {
    await setStore(store);

    ipcRenderer.on("resultBibleBooks", (event, result) => resultBibleBooks(event, result));
    ipcRenderer.on("getBookChaptersCountResult", (event, result) => getBookChaptersCountResult(event, result));
    ipcRenderer.on("getBookInChapterResult", (event, result) => getBookInChapterResult(event, result));

    ipcRenderer.send("getBibleBooks");
    store.dispatch("getBookInChapter", { bible: store.state.bible.bible, book: store.state.bible.bookSelected, chapter: store.state.bible.chapterSelected });
};
