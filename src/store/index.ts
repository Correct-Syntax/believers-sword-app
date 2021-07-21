import { createStore } from "vuex";

export default createStore({
    state: {
        number: 1,
        isWeb: false,
    },
    mutations: {},
    actions: {},
    modules: {},
    getters: {
        GET_NUMBER: state => state.number,
    },
});
