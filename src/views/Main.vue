<template>
    <div class="main-container flex h-[100%] flex-col px-10px pb-10px">
        <div id="main-container-wrapper" class="h-[100%] w-[100%] relative">
            <div id="leftSide" class="w-[var(--left-width)] h-[100%] bg-light-50 bg-opacity-10 resize-x absolute top-0">
                <LeftSideBar />
                <div id="dragbar" class="right-0 w-5px opacity-0 bg-light-50 h-[100%] bg-opacity-30 active:opacity-100 duration-300 absolute top-0" style="cursor: col-resize"></div>
            </div>
            <div id="mainWindow" class="min-w-300px absolute h-[100%] right-0">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import LeftSideBar from "@/components/leftSideBar/leftSideBar.vue";
import { dragSide } from "@/service/MouseDragResizePanel";
export default defineComponent({
    name: "MainView",
    components: { LeftSideBar },
    setup() {
        onMounted(() => {
            dragSide("main-container-wrapper", "dragbar", "--left-width");
        });
    },
});
</script>
<style lang="scss">
#main-container-wrapper {
    --left-width: 300px;
}
#mainWindow {
    width: calc(100% - var(--left-width));
}
.spanResizer {
    -webkit-app-region: no-drag;
    cursor: e-resize !important;
}
</style>