import { localStorageThemeKey } from "../ThemeChangeService";
import session from "@/service/session";

export const setStore = (store: any): void => {
    if (session.get(localStorageThemeKey)) store.state.dark = session.get(localStorageThemeKey) === "light" ? false : true;

    if (session.get("bookSelected")) store.state.bible.bookSelected = session.get("bookSelected");
    if (session.get("chapterSelected")) store.state.bible.chapterSelected = session.get("chapterSelected");
};
