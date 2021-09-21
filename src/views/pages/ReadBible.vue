<template>
    <div class="split flex flex-row h-[100%] w-[100%]">
        <div id="leftSide" class="h-[100%] dark:bg-black dark:bg-opacity-20 bg-gray-200 resize-x p-5px z-20">
            <LeftSideBar />
        </div>
        <div id="mainWindow" class="h-[100%] w-[100%]">
            <div class="split flex flex-col h-[100%] relative">
                <div id="read-chapter-area" :class="{ 'duration-200': !isOnDragVerticalSplit }">
                    <ViewChapter />
                </div>
                <div
                    id="make-notes-area"
                    class="dark:bg-black dark:bg-opacity-30 h-[100%]  bg-gray-300 bg-opacity-80 relative flex flex-col !w-[100%]"
                    :class="{ 'duration-200': !isOnDragVerticalSplit }"
                >
                    <div class="h-[100%] flex flex-col">
                        <div id="expanding-this" class="p-2px cursor-pointer w-[100%] dark:bg-gray-700 bg-gray-400 bg-opacity-30 flex justify-center items-center">
                            <i class="bx bx-notepad"></i>
                            {{ "Notes" }}
                        </div>
                        <div class="w-[100%] overflow-y-auto overflowing-div h-[100%]">
                            <Notes />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="pinakaRightSide" class="h-[100%]">
            <RightSide />
        </div>
    </div>
</template>
<script lang="ts">
import Split from "split.js";
import { defineComponent, onMounted, ref } from "vue";
import ViewChapter from "@/components/ReadBiblePageComponents/ViewChapter/ViewChapter.vue";
import RightSide from "@/components/ReadBiblePageComponents/RightSide/RightSide.vue";
import LeftSideBar from "@/components/leftSideBar/leftSideBar.vue";
import Notes from "@/components/ReadBiblePageComponents/Notes/Notes.vue"

export default defineComponent({
    components: { LeftSideBar, ViewChapter, RightSide, Notes },
    setup() {
        const toggledMakeNote = ref(false);
        const isOnDragVerticalSplit = ref(false);
        onMounted(async () => {
            const sizes: any = localStorage.getItem("read-bible-split-sizes");
            Split(["#leftSide", "#mainWindow", "#pinakaRightSide"], {
                sizes: sizes ? JSON.parse(sizes) : [20, 60, 20],
                minSize: [180, 500, 200],
                maxSize: [400, Infinity, 700],
                snapOffset: 0,

                // eslint-disable-next-line
                elementStyle: (dimension, size, gutterSize) => {
                    return {
                        "flex-basis": size + "%",
                    };
                },

                onDragEnd: (sizes) => {
                    localStorage.setItem("read-bible-split-sizes", JSON.stringify(sizes));
                },
            });

            const VerticalSizes: any = localStorage.getItem("read-chapter-split-sizes-vertical");
            let middleVerticalSplit = Split(["#read-chapter-area", "#make-notes-area"], {
                direction: "vertical",
                sizes: VerticalSizes ? JSON.parse(VerticalSizes) : [100, 0],
                minSize: [200, 20],
                snapOffset: 45,
                onDragStart: () => {
                    isOnDragVerticalSplit.value = true;
                },
                onDrag: (sizes) => {
                    if (sizes[1] > 5 && toggledMakeNote.value != true) {
                        toggledMakeNote.value = true;
                        return;
                    } else {
                        toggledMakeNote.value = false;
                    }
                },
                gutterStyle: () => {
                    return {
                        height: `0px`,
                    };
                },
                // eslint-disable-next-line
                elementStyle: (dimension, size) => {
                    return {
                        height: `${size}%`,
                    };
                },
                onDragEnd: (sizes) => {
                    isOnDragVerticalSplit.value = false;
                    localStorage.setItem("read-chapter-split-sizes-vertical", JSON.stringify(sizes));
                },
            });

            let vertical_sizes = middleVerticalSplit.getSizes();
            if (vertical_sizes[1] > 5) toggledMakeNote.value = true;

            document.getElementById("expanding-this")?.addEventListener("click", () => {
                if (toggledMakeNote.value) {
                    toggledMakeNote.value = false;

                    middleVerticalSplit.setSizes([100, 0]);
                    localStorage.setItem("read-chapter-split-sizes-vertical", JSON.stringify([100, 0]));
                } else {
                    toggledMakeNote.value = true;
                    middleVerticalSplit.setSizes([50, 50]);
                    localStorage.setItem("read-chapter-split-sizes-vertical", JSON.stringify([50, 50]));
                }
            });

            window.addEventListener("resize", () => {
                if (middleVerticalSplit.getSizes()[1] < 5) {
                    middleVerticalSplit.collapse(1);
                }
            });
        });

        return {
            isOnDragVerticalSplit,
            toggledMakeNote,
        };
    },
});
</script>
<style lang="postcss">
#leftSide {
    width: calc(var(--left-width) - var(--left-bar-width));
}

#mainWindow {
    width: calc(100% - var(--left-width) + var(--left-bar-width));
}
.spanResizer {
    -webkit-app-region: no-drag;
    cursor: e-resize !important;
}
</style>