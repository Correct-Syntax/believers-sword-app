import { bibleModule } from "./modules/bible";
import { createStore } from "vuex";

export default createStore({
    state: {
        dark: true
    },
    mutations: {},
    actions: {},
    modules: {
        bible: bibleModule
    }
});
