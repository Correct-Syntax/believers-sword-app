/* eslint-disable */
export default {
    setBibleBooks(state: any, payload: any): void {
        state.bibleBooks = payload;
    },
    setBookSelectedChapterCount(state: any, payload: any): void {
        state.bookSelectedChapterCount = payload;
    },
    setViewBookChapter(state:any, payload: any): void {
        state.viewBookChapter = payload;
    }
}