<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { NPopconfirm, useMessage, NIcon } from "naive-ui";
import { ipcRenderer } from "electron";
import { CloudDownload, Download } from "@vicons/carbon";

const store = useStore();
const updateState = computed(() => store.state.appUpdate);
const updateAvailable = computed(() => store.state.appUpdate.updateAvailable);
const message = useMessage();
const downloadingProgress = computed(() => store.state.appUpdate.downloadProgress);

const handleNegativeClick = (): void => {
    message.info("New Update Download Cancelled.");
};
const handlePositiveClick = (): void => {
    try {
        ipcRenderer.send("confirm-download-update");
        message.loading("Downloading Update, will Notify When Update is ready to install.", {
            duration: 5000,
        });
    } catch (e: any) {
        console.log(e.message);
    }
};
const installUpdateNow = (): void => {
    try {
        ipcRenderer.send("confirm-install-update");
    } catch (e: any) {
        console.log(e.message);
    }
};
</script>

<template>
    <div class="h-[100%] flex items-center" v-show="updateAvailable">
        <div v-show="downloadingProgress" class="flex mx-10px">
            <span class="mr-7px">Downloading Update: </span>
            <span class="text-[var(--primaryColor)] font-600"> {{ parseInt(downloadingProgress?.percent) }}% </span>
        </div>
        <div
            class="px-10px bg-[var(--primaryColor)] flex items-center dark:text-dark-800 text-light-200 cursor-pointer h-[100%]"
            v-show="!updateState.updatedDownloaded && !downloadingProgress"
        >
            <n-popconfirm @positive-click="handlePositiveClick" @negative-click="handleNegativeClick" positive-text="Download">
                <template #icon>
                    <NIcon>
                        <Download />
                    </NIcon>
                </template>
                <template #trigger>
                    <div class="flex justify-center items-center gap-7px h-[100%] hover:underline">
                        <NIcon size="25">
                            <CloudDownload />
                        </NIcon>
                        New Update Available
                    </div>
                </template>
                <span> Download New Update ? </span>
            </n-popconfirm>
        </div>
        <div class="px-10px bg-[var(--primaryColor)] flex items-center dark:text-dark-800 text-light-200 cursor-pointer h-[100%]" v-show="updateState.updatedDownloaded">
            <n-popconfirm @positive-click="installUpdateNow()" positive-text="Install">
                <template #icon>
                    <NIcon>
                        <Download />
                    </NIcon>
                </template>
                <template #trigger>
                    <div class="flex justify-center items-center gap-7px h-[100%] hover:underline">
                        <NIcon size="25">
                            <CloudDownload />
                        </NIcon>
                        Install Now
                    </div>
                </template>
                <span> Install Now ? </span>
            </n-popconfirm>
        </div>
    </div>
</template>
