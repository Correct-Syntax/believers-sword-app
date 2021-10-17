export const clipNotes = {
    state: {
        clipNotes: {},
        clipNotesInChapter: {},
        createClipNote: false,
        selectedVerse: {},
        deletedClipNote: {},
        addedClipNote: {},
        toggledClipNote: {}
    },
    mutations: {
        setToggledClipNote(state: any, args: any): void {
            state.toggledClipNote = args;
        }
    },
    actions: {
        setToggledClipNote(context: any, args: any): void {
            context.commit("setToggledClipNote", args);
        }
    }
};
