import { prayerList } from './modules/prayerList/prayerList';
import { markerHighLights } from './modules/markerHighlights/markerHighlights';
import { appUpdate } from './modules/appUpdate/index';
import { verseBookmarkState } from './modules/verseBookMarkState/index';
import { bibleModule } from "./modules/bible";
import { createStore } from "vuex";
import { frameState } from "./modules/frameState";
import { notes } from './modules/notes/notes';

export default createStore({
    state: {
        dark: true,
        readBibleMenuSelected: true,
        rightMenuTab: "versionsTab",
        showSettings: false
    },
    mutations: {},
    actions: {},
    modules: {
        bible: bibleModule,
        frame: frameState,
        verseBookmark: verseBookmarkState,
        appUpdate: appUpdate,
        marker: markerHighLights,
        notes: notes,
        prayerList: prayerList
    }
});
