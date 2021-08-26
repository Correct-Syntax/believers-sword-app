import { getBookChaptersCountResult, getBookInChapterResult } from "./ipcRendererOn/ipcBibleOnEvents";
/* eslint-disable */
import { ipcRenderer } from "electron";
import { resultBibleBooks } from "./ipcRendererOn/ipcBibleOnEvents";

export const setReadBiblePage = (store: any = null): void => {
    ipcRenderer.send("getBibleBooks");
    ipcRenderer.on("resultBibleBooks", (event, result) => resultBibleBooks(event, result));
    ipcRenderer.on("getBookChaptersCountResult", (event, result) => getBookChaptersCountResult(event, result));
    ipcRenderer.on("getBookInChapterResult", (event, result) => getBookInChapterResult(event, result));
};
