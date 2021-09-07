<template>
    <div class="h-[100%] flex items-center" v-show="!updateAvailable">
        <div v-if="downloadingProgress" class="flex mx-10px">
            <span class="mr-7px">Downloading: </span>
            <span> {{ parseInt(downloadingProgress.percent) }}% </span>
        </div>
        <div class="px-10px bg-[var(--primaryColor)] flex items-center dark:text-dark-800 text-light-200 cursor-pointer h-[100%]">
            <div v-if="!updateDownloaded" class="h-[100%]">
                <n-popconfirm @positive-click="handlePositiveClick" @negative-click="handleNegativeClick" positive-text="Download">
                    <template #icon>
                        <i class="bx bx-download"></i>
                    </template>
                    <template #trigger>
                        <div class="flex justify-center items-center gap-7px h-[100%] hover:underline">
                            <div class="text-size-24px">
                                <i class="bx bx-cloud-download"></i>
                            </div>
                            New Update Available
                        </div>
                    </template>
                    <span> Download New Update ? </span>
                </n-popconfirm>
            </div>
            <div v-else>
                <n-popconfirm @positive-click="installUpdateNow()" positive-text="Install">
                    <template #icon>
                        <i class="bx bx-download"></i>
                    </template>
                    <template #trigger>
                        <div class="flex justify-center items-center gap-7px h-[100%] hover:underline">
                            <div class="text-size-24px">
                                <i class="bx bx-cloud-download"></i>
                            </div>
                            Update Downloaded! Install Now
                        </div>
                    </template>
                    <span> Install Now ? </span>
                </n-popconfirm>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { computed, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { NPopconfirm, useMessage } from "naive-ui";
import { ipcRenderer } from "electron";
export default defineComponent({
    components: { NPopconfirm },
    setup() {
        const store = useStore();
        const updateAvailable = computed(() => store.state.appUpdate.updateAvailable);
        const message = useMessage();
        const updateDownloaded = ref(false);
        const downloadingProgress = computed(() => store.state.appUpdate.downloadProgress);

        onMounted(() => {
            ipcRenderer.on("update-downloaded", () => {
                updateDownloaded.value = true;
            });
        });

        return {
            updateAvailable,
            updateDownloaded,
            downloadingProgress,
            handleNegativeClick: (): void => {
                message.info("New Update Download Cancelled.");
            },
            handlePositiveClick: (): void => {
                try {
                    ipcRenderer.send("confirm-download-update");
                    message.loading("Downloading Update, will Notify When Update is ready to install.", {
                        duration: 5000,
                    });
                } catch (e: any) {
                    // eslint-disable-next-line
                    console.log(e.message);
                }
            },
            installUpdateNow: (): void => {
                try {
                    ipcRenderer.send("confirm-install-update");
                } catch (e) {
                    // eslint-disable-next-line
                    console.log(e.message);
                }
            },
        };
    },
});
</script>

