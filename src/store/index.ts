import { appUpdate } from './modules/appUpdate/index';
import { verseBookmarkState } from './modules/verseBookMarkState/index';
import { bibleModule } from "./modules/bible";
import { createStore } from "vuex";
import { frameState } from "./modules/frameState";

export default createStore({
    state: {
        dark: true,
        readBibleMenuSelected: true,
        rightMenuTab: "versionsTab"
    },
    mutations: {},
    actions: {},
    modules: {
        bible: bibleModule,
        frame: frameState,
        verseBookmark: verseBookmarkState,
        appUpdate: appUpdate
    }
});
