<script lang="ts" setup>
import { ipcRenderer } from "electron";
import { onMounted, ref } from "vue";
import { NPopover, NPopconfirm, NTooltip, NIcon, NButton } from "naive-ui";
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
    ipcRenderer.send("getDoneList");
});

const removePrayerItem = (inside: "done" | "list", key: string) => {
    try {
        ipcRenderer.send("removePrayerItem", {
            inside,
            key,
        });
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
};

function saveStateToElectronStore() {
    const pl = prayerList.value.map((item) => {
        return {
            content: item.content,
            date_created: item.date_created,
            date_updated: item.date_updated,
            key: item.key,
        };
    });
    const dpl = prayerListStore.donePrayerList.map((item) => {
        return {
            content: item.content,
            date_created: item.date_created,
            date_updated: item.date_updated,
            key: item.key,
        };
    });
    ipcRenderer.send("setPrayerListData", {
        list: pl,
        done: dpl,
    });
}

function logPrayerList() {
    saveStateToElectronStore();
}

function logDonePrayerList() {
    saveStateToElectronStore();
}

const editPrayerItem = (key: string, content: any): void => {
    editPrayerModal.value?.modalTrigger();
    editPrayerModal.value?.editor?.commands.setContent(content);
    editPrayerModal.value?.setKeyString(key);
};

const dragOptions = {
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost",
};
</script>
<template>
    <div class="px-10px h-[100%] overflow-y-auto overflowing-div scroll-bar-sm flex gap-30px">
        <div class="w-[100%] flex flex-col">
            <div class="p-10px flex justify-between items-center select-none min-h-60px">
                <span class="font-700 text-size-20px">Prayer List </span>
                <NewPrayerItem />
            </div>
            <Draggable
                class="list-group h-[100%] overflow-y-auto overflowing-div pr-10px"
                :list="prayerList"
                v-bind="dragOptions"
                group="prayer-list-items"
                @change="logPrayerList"
                itemKey="name"
            >
                <template #item="{ element }">
                    <div class="relative prayer-list-item pr-11">
                        <div class="absolute top-10px right-10px text-size-17px flex flex-col gap-1">
                            <NTooltip trigger="hover" placement="left">
                                <template #trigger>
                                    <NButton size="small" circle secondary @click="editPrayerItem(element.key, element.content)">
                                        <template #icon>
                                            <NIcon>
                                                <Edit />
                                            </NIcon>
                                        </template>
                                    </NButton>
                                </template>
                                Edit Prayer Item
                            </NTooltip>
                            <NTooltip trigger="hover" placement="bottom">
                                <template #trigger>
                                    <div>
                                        <NPopconfirm @positive-click="removePrayerItem('list', element.key)">
                                            <template #trigger>
                                                <NButton size="small" circle secondary type="error">
                                                    <NIcon>
                                                        <TrashCan />
                                                    </NIcon>
                                                </NButton>
                                            </template>
                                            Are you Sure You want To Remove This Item?
                                        </NPopconfirm>
                                    </div>
                                </template>
                                Delete Prayer Item
                            </NTooltip>
                            <NPopover trigger="hover" :show-arrow="true" placement="bottom">
                                <template #trigger>
                                    <NButton size="small" circle>
                                        <template #icon>
                                            <NIcon>
                                                <OverflowMenuVertical />
                                            </NIcon>
                                        </template>
                                    </NButton>
                                </template>
                                <div>
                                    <div class="text-size-14px flex flex-col gap-[10px]">
                                        <NPopconfirm>
                                            <template #trigger>
                                                <div class="opacity-80 hover:opacity-100 cursor-pointer">
                                                    <NIcon>
                                                        <Share />
                                                    </NIcon>
                                                    Share Prayer to Community
                                                </div>
                                            </template>
                                            Are you sure to share this Prayer Item?
                                        </NPopconfirm>
                                    </div>
                                </div>
                            </NPopover>
                        </div>
                        <div class="prayer-list-content cursor-move" v-html="element.content"></div>
                    </div>
                </template>
            </Draggable>
        </div>
        <div class="w-[100%] flex flex-col">
            <div class="p-10px flex justify-between items-center min-h-60px">
                <span class="font-700 text-size-20px select-none">Done </span>
            </div>
            <Draggable
                class="list-group h-[100%] overflow-y-auto overflowing-div pr-10px"
                :list="donePrayerList"
                v-bind="dragOptions"
                group="prayer-list-items"
                @change="logDonePrayerList"
                itemKey="name"
            >
                <template #item="{ element }">
                    <div class="relative prayer-list-item">
                        <div class="absolute top-10px right-10px text-size-17px flex">
                            <NTooltip trigger="hover" placement="bottom">
                                <template #trigger>
                                    <div>
                                        <NPopconfirm @positive-click="removePrayerItem('done', element.key)">
                                            <template #trigger>
                                                <NButton size="small" circle type="error" secondary>
                                                    <template #icon>
                                                        <NIcon>
                                                            <TrashCan />
                                                        </NIcon>
                                                    </template>
                                                </NButton>
                                            </template>
                                            Are you Sure You want To Remove This Item?
                                        </NPopconfirm>
                                    </div>
                                </template>
                                Delete Prayer Item
                            </NTooltip>
                        </div>
                        <div class="prayer-list-content cursor-move" v-html="element.content"></div>
                    </div>
                </template>
            </Draggable>
        </div>
    </div>
    <EditPrayerItem ref="editPrayerModal" />
</template>

<style lang="postcss">
.prayer-list-item {
    @apply my-10px min-h-120px dark:bg-opacity-50 dark:bg-gray-800 dark:hover:bg-gray-800 bg-gray-300 hover:bg-gray-400 p-10px rounded-md relative;

    .flip-list-move {
        transition: transform 0.5s;
    }
    .no-move {
        transition: transform 0s;
    }
    .ghost {
        opacity: 0.5;
    }
    .list-group {
        min-height: 20px;
    }
}
</style>
