<template>
    <div class="flex h-[100%] flex-col">
        <div class="text-[14px]">
            Menu Items here
        </div>
        <div class="flex h-[100%]">
            <LeftSideBar />
            <div class="w-[100%]">content</div>
            <div class="w-[100%]">right side bar</div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import LeftSideBar from "@/components/leftSideBar/leftSideBar.vue";
export default defineComponent({
    name: "MainView",
    components: { LeftSideBar }
})
</script>
