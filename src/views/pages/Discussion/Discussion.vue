<script setup lang="ts">
import { ref } from "vue";
import LeftSideMenu from "./LeftSideMenu/LeftSideMenu.vue";
import TopFilter from "./TopFilter/TopFilter.vue";
import RightSideArea from "./RightSideArea/RightSideArea.vue";
import { View, AddComment } from "@vicons/carbon";
import { NButton, NIcon } from "naive-ui";

const selectedMenu = ref<string | null>("all_discussions");
</script>
<template>
    <div class="h-[100%] h-[100%] overflow-auto overflowing-div scroll-bar-md">
        <div class="p-9 max-w-1300px mx-auto flex gap-5">
            <div class="w-350px sticky top-5 self-start">
                <LeftSideMenu v-model="selectedMenu" />
            </div>
            <div class="w-[100%]">
                <TopFilter />
                <div class="mt-40px">
                    <div class="flex gap-3 mb-15px" v-for="count in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]" :key="count">
                        <div>
                            <img
                                class="w-80px"
                                src="https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
                            />
                        </div>
                        <div>
                            <div class="flex justify-between items-center">
                                <h2 class="text-size-20px">This is the title</h2>
                                <div class="flex items-center gap-5px">
                                    <div>
                                        <NIcon>
                                            <View />
                                        </NIcon>
                                        <span class="ml-2">30</span>
                                    </div>
                                    <div>
                                        <NIcon>
                                            <AddComment />
                                        </NIcon>
                                        <span class="ml-2">30</span>
                                    </div>
                                    <NButton size="small" round tertiary>Here</NButton>
                                </div>
                            </div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel nam quasi suscipit mollitia. Iure aut sequi ea vero aliquam eaque, est, nisi non nesciunt
                            adipisci praesentium soluta inventore laudantium dolorum!
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-350px sticky top-5 self-start">
                <RightSideArea />
            </div>
        </div>
    </div>
</template>
