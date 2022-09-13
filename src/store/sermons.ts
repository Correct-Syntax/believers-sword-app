import { defineStore } from "pinia";
import { ref } from "vue";

export const userSermonStore = defineStore("userSermonStore", () => {
    const sermons = ref<Array<any>>([]);

    return {
        sermons,
        setSermons(data: Array<any>) {
            sermons.value = data;
        },
    };
});
