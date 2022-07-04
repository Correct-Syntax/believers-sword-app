// stores/counter.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRightSideMenuTabs = defineStore('readBibleRightSideStates', () => {
    const rightSideBottomSelectedTab = ref<string>('');
    const toggleDictionaryBoxRightSide = ref<boolean>(false);

    return {
        rightSideBottomSelectedTab,
        toggleDictionaryBoxRightSide,
        setRightSideBottomSelectedTab: (tab: string) => {
            rightSideBottomSelectedTab.value = rightSideBottomSelectedTab.value != tab ? tab : '';
        },
    }
})