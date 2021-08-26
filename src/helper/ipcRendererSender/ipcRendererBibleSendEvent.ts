import { ipcRenderer } from "electron";

export const getBookChaptersCount = (bible: string, book: number): void => {
    ipcRenderer.send("getBookChaptersCount", {
        book,
        bible
    });
};


export const getBookInChapter = (bible: string, book: number, chapter: number): void => {
    ipcRenderer.send("getBookInChapter", {
        book,
        bible,
        chapter
    });
};