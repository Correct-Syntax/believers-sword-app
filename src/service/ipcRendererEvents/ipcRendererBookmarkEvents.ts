import store from "@/store";

export const getVersesInBookmarkResult = (event: Electron.IpcRendererEvent, result: any): void => {
    store.dispatch("getVersesInBookmarkResult", result);
};
