import store from "@/store";

export const getVersesInBookmarkResult = (event: Electron.IpcRendererEvent, result = []): void => {
    store.dispatch("getVersesInBookmarkResult", result);
};
