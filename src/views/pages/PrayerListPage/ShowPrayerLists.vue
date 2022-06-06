<script lang="ts" setup>
import { ipcRenderer } from "electron";
import { onMounted, ref } from "vue";
import { NPopover, NPopconfirm, NTooltip, NIcon } from "naive-ui";
import EditPrayerItem from "./EditPrayerItem.vue";
import { Edit, TrashCan, OverflowMenuVertical, Share } from "@vicons/carbon";
import Draggable from "vuedraggable";
import { usePrayerListStore } from "@/store/prayerListStore";
import { storeToRefs } from "pinia";
import NewPrayerItem from "./../PrayerListPage/CreateNewPrayerItem.vue";

const prayerListStore = usePrayerListStore();
const { prayerList, donePrayerList } = storeToRefs(prayerListStore);
const editPrayerModal = ref<any>(null);

onMounted(() => {
    ipcRenderer.send("getPrayerLists");
});

function logPrayerList() {
    console.log(prayerListStore.prayerList, prayerListStore.donePrayerList);
}

function logDonePrayerList() {
    console.log(prayerListStore.prayerList, prayerListStore.donePrayerList);
}
</script>
<template>
    <div class="px-10px h-[100%] overflow-y-auto overflowing-div scroll-bar-sm flex gap-30px">
        <div class="w-[100%] flex flex-col">
            <div class="p-10px flex justify-between items-center">
                <span class="font-700 text-size-20px">Prayer List </span>
                <NewPrayerItem />
            </div>
            <Draggable class="list-group h-[100%] overflow-y-auto overflowing-div pr-10px" :list="prayerList" group="prayer-list-items" @change="logPrayerList" itemKey="name">
                <template #item="{ element }">
                    <div class="relative prayer-list-item">
                        <div class="absolute top-10px right-10px text-size-17px flex">
                            <n-tooltip trigger="hover" placement="left">
                                <template #trigger>
                                    <button class="p-5px rounded-1 dark:hover:bg-gray-700 dark:bg-opacity-20 hover:bg-gray-400">
                                        <NIcon size="25">
                                            <Edit />
                                        </NIcon>
                                    </button>
                                </template>
                                Edit Prayer Item
                            </n-tooltip>
                            <n-tooltip trigger="hover" placement="bottom">
                                <template #trigger>
                                    <div>
                                        <n-popconfirm>
                                            <template #trigger>
                                                <button class="p-5px rounded-1 dark:hover:bg-red-500 dark:bg-opacity-20 hover:bg-red-300">
                                                    <NIcon size="25">
                                                        <TrashCan />
                                                    </NIcon>
                                                </button>
                                            </template>
                                            Are you Sure You want To Remove This Item?
                                        </n-popconfirm>
                                    </div>
                                </template>
                                Delete Prayer Item
                            </n-tooltip>

                            <NPopover trigger="hover" :show-arrow="true" placement="bottom">
                                <template #trigger>
                                    <button class="p-5px rounded-1 dark:hover:bg-gray-700 dark:bg-opacity-20 hover:bg-gray-400">
                                        <NIcon size="25">
                                            <OverflowMenuVertical />
                                        </NIcon>
                                    </button>
                                </template>
                                <div>
                                    <div class="text-size-14px flex flex-col gap-[10px]">
                                        <n-popconfirm>
                                            <template #trigger>
                                                <div class="opacity-50 hover:opacity-100 cursor-pointer">
                                                    <NIcon size="25">
                                                        <Share />
                                                    </NIcon>
                                                    Share Prayer to Community
                                                </div>
                                            </template>
                                            Are you sure to share this Prayer Item?
                                        </n-popconfirm>
                                    </div>
                                </div>
                            </NPopover>
                        </div>
                        <div class="list-group-item" v-html="element.content"></div>
                    </div>
                </template>
            </Draggable>
        </div>
        <div class="w-[100%]">
            <Draggable
                class="list-group h-[95%] overflow-y-auto overflowing-div pr-10px"
                :list="donePrayerList"
                group="prayer-list-items"
                @change="logDonePrayerList"
                itemKey="name"
            >
                <template #item="{ element }">
                    <div class="relative prayer-list-item">
                        <div class="absolute top-10px right-10px text-size-17px flex">
                            <n-tooltip trigger="hover" placement="left">
                                <template #trigger>
                                    <button class="p-5px rounded-1 dark:hover:bg-gray-700 dark:bg-opacity-20 hover:bg-gray-400">
                                        <NIcon size="25">
                                            <Edit />
                                        </NIcon>
                                    </button>
                                </template>
                                Edit Prayer Item
                            </n-tooltip>
                            <n-tooltip trigger="hover" placement="bottom">
                                <template #trigger>
                                    <div>
                                        <n-popconfirm>
                                            <template #trigger>
                                                <button class="p-5px rounded-1 dark:hover:bg-red-500 dark:bg-opacity-20 hover:bg-red-300">
                                                    <NIcon size="25">
                                                        <TrashCan />
                                                    </NIcon>
                                                </button>
                                            </template>
                                            Are you Sure You want To Remove This Item?
                                        </n-popconfirm>
                                    </div>
                                </template>
                                Delete Prayer Item
                            </n-tooltip>

                            <NPopover trigger="hover" :show-arrow="true" placement="bottom">
                                <template #trigger>
                                    <button class="p-5px rounded-1 dark:hover:bg-gray-700 dark:bg-opacity-20 hover:bg-gray-400">
                                        <NIcon size="25">
                                            <OverflowMenuVertical />
                                        </NIcon>
                                    </button>
                                </template>
                                <div>
                                    <div class="text-size-14px flex flex-col gap-[10px]">
                                        <n-popconfirm>
                                            <template #trigger>
                                                <div class="opacity-50 hover:opacity-100 cursor-pointer">
                                                    <NIcon size="25">
                                                        <Share />
                                                    </NIcon>
                                                    Share Prayer to Community
                                                </div>
                                            </template>
                                            Are you sure to share this Prayer Item?
                                        </n-popconfirm>
                                    </div>
                                </div>
                            </NPopover>
                        </div>
                        <div class="list-group-item" v-html="element.content"></div>
                    </div>
                </template>
            </Draggable>
        </div>
    </div>
    <EditPrayerItem ref="editPrayerModal" />
</template>

<style lang="postcss">
.prayer-list-item {
    @apply my-10px dark:hover:bg-gray-800 hover:bg-gray-300 p-10px rounded-md relative;
}
</style>
