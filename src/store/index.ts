import { createStore } from "vuex";

export default createStore({
    state: {
        dark: true,
        bible: {
            bible: 't_kjv',
            bibleBooks: [],
            bookSelected: 1,
            chapterSelected: 1,
            bookSelectedChapterCount: 50,
            viewBookChapter: []
        }
    },
    mutations: {},
    actions: {},
    modules: {}
});
