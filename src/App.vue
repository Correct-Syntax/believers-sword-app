<template>
    <div class="dark h-[100vh]">
        <TitleBar />
        <div class="dark:bg-gray-800 dark:text-gray-100 h-[calc(100%-30px)] overflow-y-auto">
            <div class="flex">
                <leftSideBar />
                <div>content</div>
                <div>right side bar</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TitleBar from "./components/TitleBar/TitleBar.vue";
import leftSideBar from "./components/leftSideBar/leftSideBar.vue"

export default defineComponent({
    name: "App",
    components: { TitleBar,leftSideBar },
});
</script>
