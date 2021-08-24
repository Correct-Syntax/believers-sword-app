<template>
    <div class="main-container flex h-[100%] flex-col">
        <div class="h-[100%] w-[100%] relative px-7px relative">
            <div class="absolute h-[100%] w-[var(--left-bar-width)]">
                <LeftSideMenuBar />
            </div>
            <div id="main-container-wrapper" class="h-[100%] w-[100%] relative">
                <div id="leftSide" class="h-[100%] bg-black bg-opacity-30 resize-x absolute top-0 p-5px">
                    <LeftSideBar />
                    <div id="dragbar" class="right-0 w-5px opacity-0 bg-light-50 h-[100%] bg-opacity-30 active:opacity-100 duration-300 absolute top-0" style="cursor: col-resize"></div>
                </div>
                <div id="mainWindow" class="min-w-300px absolute h-[100%] right-0 p-5px">
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <div class="bg-gray-900">This will be the bottom of the window to show, internet connection status, notification etc.</div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import LeftSideBar from "@/components/leftSideBar/leftSideBar.vue";
import { dragSide } from "@/service/MouseDragResizePanel";
import LeftSideMenuBar from "@/components/leftSideMenuBar/leftSideMenuBar.vue";
export default defineComponent({
    name: "MainView",
    components: { LeftSideBar, LeftSideMenuBar },
    setup() {
        onMounted(() => {
            dragSide("main-container-wrapper", "dragbar", "--left-width", 600, 100);

            document.getElementById('main-container-wrapper')?.style.setProperty('--left-width', '280px');
        });
    },
});
</script>
<style lang="scss">
#main-container-wrapper {
    --left-width: 300px;
    --left-bar-width: 37px;
}
#leftSide {
    width: calc(var(--left-width) - var(--left-bar-width));
    left: var(--left-bar-width);
}

#mainWindow {
    width: calc(100% - var(--left-width));
}
.spanResizer {
    -webkit-app-region: no-drag;
    cursor: e-resize !important;
}
</style>