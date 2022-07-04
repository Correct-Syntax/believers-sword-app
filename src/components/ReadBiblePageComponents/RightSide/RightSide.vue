<script lang="ts" setup>
import { computed, onMounted, watch } from "vue";
import SelectBibleVersions from "./SelectBibleVersions/SelectBibleVersions.vue";
import SearchTab from "./Search/Search.vue";
import Bookmarks from "./Bookmarks/Bookmarks.vue";
import { useStore } from "vuex";
import RightSideMenuBar from "@/components/ReadBiblePageComponents/RightSide/rightSideMenuBar/rightSideMenuBar.vue";
import MarkedHighlights from "./MarkedHighlights/MarkedHighlights.vue";
import ShowClipNotes from "./showClipNotes/showClipNotes.vue";
import Dictionary from "./Dictionary/Dictionary.vue";
import Split from "split.js";
import { useRightSideMenuTabs } from "@/store/ReadBibleRightSideStates";
import { storeToRefs } from "pinia";

const rightSideMenuTabStore = useRightSideMenuTabs();
const { rightSideBottomSelectedTab, toggleDictionaryBoxRightSide } = storeToRefs(rightSideMenuTabStore);

const store = useStore();
const tabValue = computed(() => store.state.rightMenuTab);
const rightSideColumnSplitLocalStorageKey = "right-side-column-split-sizes";

watch(rightSideBottomSelectedTab, () => {
    clickExpandDictionary();
});

function clickExpandDictionary() {
    document.getElementById("right-side-dictionary-click-to-expand")?.click();
}

onMounted(() => {
    const rightSideColumnSplitSizes = localStorage.getItem(rightSideColumnSplitLocalStorageKey);
    if (rightSideColumnSplitSizes && JSON.parse(rightSideColumnSplitSizes)[1] > 0) {
        toggleDictionaryBoxRightSide.value = true;
    }
    let rightSideSplitDiv = Split(["#right-side-top-split-div", "#right-side-bottom-split-div"], {
        direction: "vertical",
        minSize: [200, 20],
        sizes: rightSideColumnSplitSizes ? JSON.parse(rightSideColumnSplitSizes) : [100, 0],
        snapOffset: 20,
        gutterStyle: () => {
            return {
                height: `0px`,
            };
        },
        elementStyle: (dimension, size) => {
            return {
                height: `${size}%`,
            };
        },
        onDragEnd: (sizes) => {
            localStorage.setItem(rightSideColumnSplitLocalStorageKey, JSON.stringify(sizes));
            localStorage.setItem("right-side-split-sizes-vertical-open-sizes", JSON.stringify(sizes));
        },
    });

    document.getElementById("right-side-dictionary-click-to-expand")?.addEventListener("click", () => {
        if (toggleDictionaryBoxRightSide.value) {
            toggleDictionaryBoxRightSide.value = false;

            rightSideSplitDiv.setSizes([100, 0]);
            localStorage.setItem(rightSideColumnSplitLocalStorageKey, JSON.stringify([100, 0]));
        } else {
            toggleDictionaryBoxRightSide.value = true;
            const vertical: any = localStorage.getItem("right-side-split-sizes-vertical-open-sizes");
            if (vertical && JSON.parse(vertical)[1] < 10) {
                rightSideSplitDiv.setSizes([50, 50]);
                localStorage.setItem(rightSideColumnSplitLocalStorageKey, JSON.stringify([50, 50]));
                return;
            }
            rightSideSplitDiv.setSizes(vertical ? JSON.parse(vertical) : [50, 50]);
            localStorage.setItem(rightSideColumnSplitLocalStorageKey, vertical);
        }
    });

    window.addEventListener("resize", () => {
        if (rightSideSplitDiv.getSizes()[1] < 10) {
            rightSideSplitDiv.collapse(1);
        }
    });
});
</script>
<template>
    <div
        id="right-side-bar"
        :class="{ 'dont-show-split-hover': rightSideBottomSelectedTab == '' }"
        class="h-[100%] w-[100%] select-none dark:bg-black dark:bg-opacity-20 bg-gray-200"
    >
        <RightSideMenuBar />
        <div class="h-[100%] w-[100%] split flex flex-col">
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
