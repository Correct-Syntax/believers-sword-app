// stores/counter.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePrayerListStore = defineStore('prayerListStoreId', () => {
    const prayerList = ref<Array<any>>([]);
    const donePrayerList = ref<Array<any>>([]);

    return {
        prayerList,
        donePrayerList,
        setPrayerList: (data: Array<any>) => {
            prayerList.value = data
        },
        setDonePrayerList: (data: Array<any>) => donePrayerList.value = data,
    }
})