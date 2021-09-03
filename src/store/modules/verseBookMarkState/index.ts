export const verseBookmarkState = {
    state: {
        bookmarks: [],
        savedBookmarks: []
    },
    mutations: {
        setBookmarks(state: any, payload: any): void {
            state.savedBookmarks = payload;
        }
    },
    actions: {
        getVersesInBookmarkResult(context: any, payload: any): void {
            context.commit("setBookmarks", payload)
        }
    }
};
