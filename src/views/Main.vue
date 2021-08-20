<template>
    <div class="flex h-[100%] flex-col px-10px pb-10px">
        <div class="flex h-[100%]">
            <LeftSideBar />
            <div class="w-[100%] border border-blue-500">
                <router-view></router-view>
            </div>
            <div class="w-[600px] border border-green-400">right side bar</div>
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
