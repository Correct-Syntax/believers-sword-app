import { mainWindowLoad, getBibleBooks, getBookChaptersCount, getBookInChapter, getBibleVersions } from './common/BibleEvents';
import { ipcMain } from 'electron';
import { closeWindow, maximizeWindow, minimizeWindow } from './common/BrowserWindowEvents';
const log = require("electron-log");
const isDevelopment = process.env.NODE_ENV !== "production";
const config = require("./../../db.config");
const knex = require("knex")(isDevelopment ? config.development : config.production);

export const ipcMainEvents = (win: any) => {
    ipcMain.on("minimizeWindow", () => minimizeWindow(win));
    ipcMain.on("maximizeWindow", () => maximizeWindow(win));
    ipcMain.on("closeWindow", () => closeWindow(win));
    ipcMain.on("mainWindowLoad", () => mainWindowLoad(win));
    ipcMain.on("getBibleBooks", () => getBibleBooks(win));
    ipcMain.on("getBookChaptersCount", (event, { book, bible }) => getBookChaptersCount(win, {book, bible}));
    ipcMain.on("getBookInChapter", (event, { book, bible, chapter, versions }) => getBookInChapter(win, {book, bible, chapter, versions}));
    ipcMain.on("getBibleVersions", () => getBibleVersions(win));
};
