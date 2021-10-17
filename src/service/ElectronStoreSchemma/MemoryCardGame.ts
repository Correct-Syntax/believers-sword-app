import ElectronStore from "electron-store";

export const MemoryCardGameStore: any = new ElectronStore({
    name: "memoryCardGameStore",
    defaults: {
        flipCards: {
            sampleQuestionAnswer: {
                key: "sampleQuestionAnswer",
                question: "What is the first book in the Bible?",
                answer: "Genesis"
            }
        }
    },
    schema: {
        flipCards: {
            type: "object"
        }
    }
});
