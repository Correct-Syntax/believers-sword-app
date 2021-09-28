<template>
    <div class="px-10px h-[100%] overflow-y-auto overflowing-div scroll-bar-sm">
        <div v-for="(item, i) in prayerList" :key="i" class="prayer-list max-w-800px mx-auto my-10px">
            <template v-if="item">
                <div v-for="prayerItem in item" :key="prayerItem.key" class="prayer-list-item">
                    <div class="absolute top-10px right-10px text-size-24px">
                        <NPopover trigger="hover" :show-arrow="true" placement="bottom">
                            <template #trigger>
                                <button class="p-5px rounded-1 dark:hover:bg-gray-800 dark:bg-opacity-20 hover:bg-gray-400">
                                    <i class="bx bx-dots-vertical-rounded"></i>
                                </button>
                            </template>
                            <div>
                                <div class="text-size-14px flex flex-col gap-[10px]">
                                    <n-popconfirm >
                                        <template #trigger>
                                            <div class="opacity-50 hover:opacity-100 cursor-pointer">
                                                <i class="bx bx-share-alt"></i>
                                                Share Prayer to Community
                                            </div>
                                        </template>
                                        Are you sure to share this Prayer Item?
                                    </n-popconfirm>
                                    <n-popconfirm @positive-click="removePrayerItem({ folder: i, key: prayerItem.key })" >
                                        <template #trigger>
                                            <div class="opacity-50 hover:opacity-100 cursor-pointer">
                                                <i class="bx bx-trash-alt"></i>
                                                Remove Item from Prayer List
                                            </div>
                                        </template>
                                        Are you Sure You want To Remove This Item?
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
</template>
<script lang="ts">
import { ipcRenderer } from "electron";
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { NPopover, NPopconfirm, NEmpty } from "naive-ui";

export default defineComponent({
    components: {
        NPopover,
        NPopconfirm,
        NEmpty,
    },
    setup() {
        const store = useStore();
        const prayerList = computed(() => store.state.prayerList.list);
        onMounted(() => {
            ipcRenderer.on("getPrayerLists", (event, payload) => {
                store.state.prayerList.list = payload;
            });
            ipcRenderer.send("getPrayerLists");
        });
        return {
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
    @apply dark:bg-gray-800 bg-gray-300 my-10px dark:hover:bg-gray-900 hover:bg-gray-400 p-10px rounded-md relative;
}
</style>