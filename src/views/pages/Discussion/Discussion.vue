<script setup lang="ts">
import { ref } from "vue";
import LeftSideMenu from "./LeftSideMenu/LeftSideMenu.vue";
import RightSideArea from "./RightSideArea/RightSideArea.vue";

const selectedMenu = ref<string | null>("all_discussions");
</script>
<template>
    <div class="h-[100%] h-[100%] overflow-y-scroll overflowing-div scroll-bar-md">
        <div class="p-9 max-w-1300px mx-auto flex gap-5">
            <div class="w-350px sticky top-5 self-start">
                <LeftSideMenu v-model="selectedMenu" />
            </div>
            <div class="w-[100%]">
                <router-view />
            </div>
            <div class="w-350px sticky top-5 self-start">
                <RightSideArea />
            </div>
        </div>
    </div>
</template>
