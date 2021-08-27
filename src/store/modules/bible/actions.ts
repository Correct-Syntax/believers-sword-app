import session from '@/helper/session';
import { ipcRenderer } from "electron";
/* eslint-disable */
export default {
    setBibleBooks(context: any, payload: any): void {
        context.commit("setBibleBooks", payload);
    },
    setBookSelectedChapterCount(context: any, payload: any): void {
        context.commit("setBookSelectedChapterCount", payload);
    },
    setViewBookChapter(context: any, payload: Array<string | number | Record<string, unknown>>): void {
        context.commit("setViewBookChapter", payload);
    },
    getBookChaptersCount(context: any, { bible, book }: any): void {
        session.set('bookSelected', book);
        ipcRenderer.send("getBookChaptersCount", {
            book,
            bible
        });
    },
    getBookInChapter(context: any, {bible, book, chapter}: any): void {
        session.set('chapterSelected', chapter);
        ipcRenderer.send("getBookInChapter", {
            book,
            bible,
            chapter
        });
    }
};
