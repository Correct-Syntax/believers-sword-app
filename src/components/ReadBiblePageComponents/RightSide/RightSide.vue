<script lang="ts" setup>
import { computed, watch } from "vue";
import SelectBibleVersions from "./SelectBibleVersions/SelectBibleVersions.vue";
import SearchTab from "./Search/Search.vue";
import Bookmarks from "./Bookmarks/Bookmarks.vue";
import { useStore } from "vuex";
import RightSideMenuBar from "@/components/ReadBiblePageComponents/RightSide/rightSideMenuBar/rightSideMenuBar.vue";
import MarkedHighlights from "./MarkedHighlights/MarkedHighlights.vue";
import ShowClipNotes from "./showClipNotes/showClipNotes.vue";
import Dictionary from "./Dictionary/Dictionary.vue";
import { useRightSideMenuTabs } from "@/store/ReadBibleRightSideStates";
import { storeToRefs } from "pinia";

const rightSideMenuTabStore = useRightSideMenuTabs();
const { rightSideBottomSelectedTab } = storeToRefs(rightSideMenuTabStore);
const store = useStore();
const tabValue = computed(() => store.state.rightMenuTab);

watch(rightSideBottomSelectedTab, () => {
    document.getElementById("right-side-dictionary-click-to-expand")?.click();
});
</script>
<template>
    <div id="right-side-bar" class="h-[100%] w-[100%] select-none dark:bg-black dark:bg-opacity-20 bg-gray-200">
        <RightSideMenuBar />
        <div class="h-[100%] w-[100%] split !flex !flex-col relative">
            <div id="right-side-top-split-div">
                <SearchTab v-if="tabValue === 'searchTab'" />
                <SelectBibleVersions v-if="tabValue === 'versionsTab'" />
                <Bookmarks v-show="tabValue === 'bookmarksTab'" />
                <MarkedHighlights v-show="tabValue === 'MarkedHighlights'" />
                <ShowClipNotes v-show="tabValue === 'MyNotes'" />
            </div>

            <div id="right-side-bottom-split-div">
                <div
                    id="right-side-dictionary-click-to-expand"
                    class="p-2px cursor-pointer w-[100%] dark:bg-gray-700 bg-gray-400 bg-opacity-30 flex justify-center items-center select-none flex items-center duration-200 active:bg-[var(--primaryColor)] dark:hover:bg-gray-600 hover:bg-gray-300"
                >
                    Dictionary
                </div>
                <Dictionary />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
#right-side-bar {
    --right-side-tab-height: 40px;
}
</style>
