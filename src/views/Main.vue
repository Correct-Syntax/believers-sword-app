<template>
    <div id="main-container" class="main-container flex h-[100%] flex-col">
        <div class="h-[100%] w-[100%] relative px-7px relative">
            <div class="absolute h-[100%] w-[var(--left-bar-width)]">
                <LeftSideMenuBar />
            </div>
            <div id="main-container-wrapper" class="h-[100%] relative">
                <router-view></router-view>
            </div>
        </div>
        <div class="dark:bg-gray-900 bg-gray-300 px-[7px] py-[2px]">This will be the bottom of the window to show, internet connection status, notification etc.</div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import LeftSideMenuBar from "@/components/leftSideMenuBar/leftSideMenuBar.vue";
export default defineComponent({
    name: "MainView",
    components: { LeftSideMenuBar },
});
</script>
<style lang="scss">
#main-container {
    --left-bar-width: 37px;
}
#main-container-wrapper {
    --left-width: 300px;
    left: var(--left-bar-width);
    width: calc(100% - var(--left-bar-width));
}
</style>