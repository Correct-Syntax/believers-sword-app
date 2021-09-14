import store from "@/store";

export const resultBibleBooks = (event: Electron.IpcRendererEvent, result: Array<string|number|Record<string, unknown>>) :void => {
    store.dispatch("setBibleBooks", result);
};

export const getBookChaptersCountResult = (event: Electron.IpcRendererEvent, result = []): void => {
    store.dispatch("setBookSelectedChapterCount", result.length);
};

export const getBookInChapterResult = (event: Electron.IpcRendererEvent, result = []): void => {
    store.dispatch('setViewBookChapter', result);
};


export const getBibleVersionsResult = (event: Electron.IpcRendererEvent, result = []): void => {
    store.dispatch('getBibleVersions', {getInStore: true, data: result});
} 