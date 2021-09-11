export const markerHighLights = {
    state: {
        highlights: {},
        selectedHighlights: ""
    },
    mutations: {
        setHighlights(s: any, payload: any) {
            s.highlights = payload;
        }
    },
    actions: {
        setHighlights(context: any, payload: any) {
            context.commit("setHighlights", payload);
        }
    }
};
