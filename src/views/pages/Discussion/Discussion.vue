<script setup lang="ts">
import { ref, watch } from "vue";
import LeftSideMenu from "./LeftSideMenu/LeftSideMenu.vue";

const ads = [
    {
        image: "https://laracasts.nyc3.cdn.digitaloceanspaces.com/series/thumbnails/modern-javascript-basics.png",
        label: "Modern Javascript Basics",
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    },
];

const selectedMenu = ref<string | null>("all_discussions");
watch(selectedMenu, (data) => {
    console.log(data);
});
</script>
<template>
    <div class="h-[100%] h-[100%] overflow-auto overflowing-div scroll-bar-md">
        <div class="p-9 max-w-1300px mx-auto flex gap-5">
            <div class="w-350px sticky top-5 self-start">
                <LeftSideMenu v-model="selectedMenu" />
            </div>
            <div class="w-[100%]">
                <div class="flex w-[100%] justify-between">
                    <div></div>
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quidem suscipit reprehenderit soluta aliquid rerum odio, mollitia beatae iusto nihil! Fugit
                        nesciunt repudiandae, asperiores in est error a itaque quibusdam?
                    </div>
                </div>
                <div></div>
            </div>
            <div class="w-350px sticky top-5 self-start">
                <div v-for="ad in ads" :key="ad.label" class="p-3 text-center">
                    <img class="w-100px mx-auto mb-2" :src="ad.image" />
                    <h2 class="font-800">{{ ad.label }}</h2>
                    <p>{{ ad.description }}</p>
                    <button
                        class="text-left px-10px py-9px rounded-xl dark:hover:text-[var(--primaryColor)] text-size-15px dark:bg-blue-100 dark:bg-opacity-5 hover:bg-gray-900 hover:bg-opacity-5 mt-3"
                    >
                        Click Fore more Details
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
