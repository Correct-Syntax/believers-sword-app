export const verseBookmarkState = {
    state: {
        bookmarks: [],
        savedBookmarks: [],
        selectedBookmark: {},
        bookmarkTotalCount: 0
    },
    mutations: {
        setBookmarks(state: any, payload: any): void {
            state.savedBookmarks = payload;
        },
        setBookmarkTotalCount(state: any, payload: number): void {
            state.bookmarkTotalCount = payload;
        }
    },
    actions: {
        getVersesInBookmarkResult(context: any, payload: any): void {
            context.commit("setBookmarks", payload);
        },
        setBookmarkTotalCount(context: any, payload: number): void {
            context.commit("setBookmarkTotalCount", payload);
        }
    }
};
