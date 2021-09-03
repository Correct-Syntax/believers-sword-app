import { verseBookmarkState } from './modules/verseBookMarkState/index';
import { bibleModule } from "./modules/bible";
import { createStore } from "vuex";
import { frameState } from "./modules/frameState";

export default createStore({
    state: {
        dark: true,
        readBibleMenuSelected: true,
    },
    mutations: {},
    actions: {},
    modules: {
        bible: bibleModule,
        frame: frameState,
        verseBookmark: verseBookmarkState
    }
});
