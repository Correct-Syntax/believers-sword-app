<template>
    <div class="px-10px h-[100%] overflow-y-auto overflowing-div scroll-bar-sm">
        <div v-for="(item, i) in prayerList" :key="i" class="prayer-list max-w-800px mx-auto my-10px">
            <template v-if="item">
                <div v-for="(prayerItem, keyString) in item" :key="prayerItem.key" class="prayer-list-item">
                    <div class="absolute top-10px right-10px text-size-17px flex">
                        <n-tooltip trigger="hover" placement="left">
                            <template #trigger>
                                <button
                                    class="p-5px rounded-1 dark:hover:bg-gray-700 dark:bg-opacity-20 hover:bg-gray-400"
                                    @click="editPrayerItem(`${i}.${keyString}`, prayerItem.content)"
                                >
                                    <i class="bx bx-edit"></i>
                                </button>
                            </template>
                            Edit Prayer Item
                        </n-tooltip>
                        <n-tooltip trigger="hover" placement="bottom">
                            <template #trigger>
                                <div>
                                    <n-popconfirm @positive-click="removePrayerItem({ folder: i, key: prayerItem.key })">
                                        <template #trigger>
                                            <button class="p-5px rounded-1 dark:hover:bg-red-500 dark:bg-opacity-20 hover:bg-red-300">
                                                <i class="bx bx-trash-alt"></i>
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
                                    <i class="bx bx-dots-vertical-rounded"></i>
                                </button>
                            </template>
                            <div>
                                <div class="text-size-14px flex flex-col gap-[10px]">
                                    <n-popconfirm>
                                        <template #trigger>
                                            <div class="opacity-50 hover:opacity-100 cursor-pointer">
                                                <i class="bx bx-share-alt"></i>
                                                Share Prayer to Community
                                            </div>
                                        </template>
                                        Are you sure to share this Prayer Item?
                                    </n-popconfirm>
                                </div>
                            </div>
                        </NPopover>
                    </div>
                    <div v-html="prayerItem.content"></div>
                </div>
            </template>
        </div>
        <NEmpty v-if="isPrayerListEmpty()" class="mt-50px"> Prayer Item is Empty. </NEmpty>
    </div>
    <EditPrayerItem ref="editPrayerModal" />
</template>
<script lang="ts">
import { ipcRenderer } from "electron";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { NPopover, NPopconfirm, NEmpty, NTooltip } from "naive-ui";
import EditPrayerItem from "./EditPrayerItem.vue";

export default defineComponent({
    components: {
        NPopover,
        NPopconfirm,
        NEmpty,
        NTooltip,
        EditPrayerItem,
    },
    setup() {
        const store = useStore();
        const prayerList = computed(() => store.state.prayerList.list);
        const editPrayerModal = ref<any>(null);
        onMounted(() => {
            ipcRenderer.on("getPrayerLists", (event, payload) => {
                store.state.prayerList.list = payload;
            });
            ipcRenderer.send("getPrayerLists");
        });

        const editPrayerItem = (key: string, content: any): void => {
            editPrayerModal.value?.modalTrigger();
            editPrayerModal.value?.editor?.commands.setContent(content);
            editPrayerModal.value?.setKeyString(key);
        };

        return {
            editPrayerItem,
            editPrayerModal,
            prayerList,
            removePrayerItem: (payload: any) => {
                try {
                    ipcRenderer.send("removePrayerItem", payload);
                } catch (e) {
                    if (e instanceof Error) console.log(e.message);
                }
            },
            isPrayerListEmpty: (): boolean => {
                if (prayerList.value) {
                    for (var index in prayerList.value) {
                        if (Object.keys(prayerList.value[index]).length > 0) return false;
                    }
                }
                return true;
            },
        };
    },
});
</script>
<style lang="postcss">
.prayer-list-item {
    @apply my-10px dark:hover:bg-gray-800 hover:bg-gray-300 p-10px rounded-md relative;
}
</style>