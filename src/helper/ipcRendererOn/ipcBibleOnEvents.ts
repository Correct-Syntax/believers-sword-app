import store from "@/store";
/* eslint-disable */
export const resultBibleBooks = (event: any, result: any) => {
    store.state.bible.bibleBooks = result;
};

export const getBookChaptersCountResult = (event: any, result = []) => {
    if (result && result.length > 0) store.state.bible.bookSelectedChapterCount = result.length;
};

export const getBookInChapterResult = (event: any, result: any) => {
    if (result && result.length > 0) store.state.bible.viewBookChapter = result;
};
