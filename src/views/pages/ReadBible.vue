<template>
    <div class="split flex flex-row h-[100%] w-[100%]">
        <div id="leftSide" class="h-[100%] dark:bg-black dark:bg-opacity-20 bg-gray-200 resize-x p-5px z-20">
            <LeftSideBar />
        </div>
        <div id="mainWindow" class="h-[100%]">
            <div class="split flex flex-col h-[100%] relative">
                <div id="read-chapter-area">
                    <ViewChapter />
                </div>
                <div id="make-notes-area" class="create-notes-container overflow-auto bg-black bg-opacity-40 p-7px">
                    Create Notes here
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
import { defineComponent, onMounted } from "vue";
import ViewChapter from "@/components/ReadBiblePageComponents/ViewChapter/ViewChapter.vue";
import RightSide from "@/components/ReadBiblePageComponents/RightSide/RightSide.vue";
import LeftSideBar from "@/components/leftSideBar/leftSideBar.vue";

export default defineComponent({
    components: { LeftSideBar, ViewChapter, RightSide },
    setup() {
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
            Split(["#read-chapter-area", "#make-notes-area"], {
                direction: "vertical",
                sizes: VerticalSizes ? JSON.parse(VerticalSizes) :[70, 30],
                minSize: [200, 0],
                snapOffset: 100,
                // eslint-disable-next-line
                elementStyle: (dimension, size, gutterSize) => {
                    return {
                        height: size + "%",
                        "flex-basis": size + "%",
                    };
                },
                onDragEnd: (sizes) => {
                    localStorage.setItem("read-chapter-split-sizes-vertical", JSON.stringify(sizes));
                },
            });
        });
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