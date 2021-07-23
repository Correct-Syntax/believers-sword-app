import { createStore } from "vuex";

export default createStore({
    state: {
        number: 1,
        isWeb: process.env.VUE_APP_WEB == "true" ? true : false,
        theme: "dark",
    },
    mutations: {},
    actions: {},
    modules: {},
    getters: {
        GET_NUMBER: state => state.number,
    },
});
