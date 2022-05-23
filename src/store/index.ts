import { sermonState } from "./modules/sermons/sermons";
import { clipNotes } from "./modules/clipNotes/clipNotes";
import { prayerList } from "./modules/prayerList/prayerList";
import { markerHighLights } from "./modules/markerHighlights/markerHighlights";
import { appUpdate } from "./modules/appUpdate/index";
import { verseBookmarkState } from "./modules/verseBookMarkState/index";
import { bibleModule } from "./modules/bible";
import { createStore } from "vuex";
import { frameState } from "./modules/frameState";
import { notes } from "./modules/notes/notes";

export default createStore({
    state: {
        dark: true,
        showUnRoutePage: "showBible",
        rightMenuTab: "versionsTab",
        showSettings: false,
        primaryColors: {
            primaryColorDark: "#3cb1ff",
            primaryColorLight: "#008fee",
        },
        isUserLogged: false
    },
    mutations: {
        setIsUserLogged(state, args) {
            state.isUserLogged = args;
        }
    },
    actions: {
        isUserLoggedToggle(context, args: boolean) {
            context.commit('setIsUserLogged', args);
        }
    },
    modules: {
        bible: bibleModule,
        frame: frameState,
        verseBookmark: verseBookmarkState,
        appUpdate: appUpdate,
        marker: markerHighLights,
        notes: notes,
        prayerList: prayerList,
        clipNotes: clipNotes,
        sermonState: sermonState,
    },
});
