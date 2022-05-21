export const markerHighLights = {
    state: {
        highlights: {},
        selectedHighlights: "",
        count: 0
    },
    mutations: {
        setHighlights(s: any, payload: any) {
            s.highlights = payload;
        },
        setCount(s: any, payload: number) {
            s.count = payload
        },
    },
    actions: {
        setHighlights(context: any, payload: any) {
            context.commit("setHighlights", payload.data);
            context.commit("setCount", payload.count);
        },
    }
};
