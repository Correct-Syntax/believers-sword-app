<template>
    <div id="leftSide" class="h-[100%] dark:bg-black dark:bg-opacity-30 bg-gray-300 resize-x absolute top-0 p-5px z-30">
        <LeftSideBar />
        <div id="dragbar" class="drag-bar" style="cursor: col-resize"></div>
    </div>
    <div id="mainWindow" class="min-w-300px absolute h-[100%] right-0">
        <ViewChapter />
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import LeftSideBar from "@/components/leftSideBar/leftSideBar.vue";
import { dragSide } from "@/service/MouseDragResizePanel";
import { readBibleLeftSideBarWidth } from "@/service/widthSizeConstantVariables"
import session from "@/service/session";
import ViewChapter from "@/components/ReadBiblePageComponents/ViewChapter/ViewChapter.vue"
export default defineComponent({
    components: { LeftSideBar, ViewChapter },
    setup() {
        onMounted(async () => {
            const leftSideWidth = session.get(readBibleLeftSideBarWidth)
            document.getElementById("main-container-wrapper")?.style.setProperty("--left-width", `${leftSideWidth ? leftSideWidth : 300}px`);
            dragSide("main-container-wrapper", "dragbar", "--left-width", 400, 250, readBibleLeftSideBarWidth);
        });
    },
});
</script>
<style lang="scss">
#leftSide {
    width: calc(var(--left-width) - var(--left-bar-width));
}

#dragbar.drag-bar {
    @apply right-0 w-5px dark:opacity-0 opacity-0 dark:bg-light-50 bg-gray-600 h-[100%] dark:bg-opacity-30 bg-opacity-30 active:opacity-100 dark:active:opacity-100 duration-300 absolute top-0;
}

#mainWindow {
    width: calc(100% - var(--left-width) + var(--left-bar-width));
}
.spanResizer {
    -webkit-app-region: no-drag;
    cursor: e-resize !important;
}
</style>