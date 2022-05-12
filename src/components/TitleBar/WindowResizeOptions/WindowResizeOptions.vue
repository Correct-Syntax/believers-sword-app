<script lang="ts" setup>
import { ipcRenderer } from "electron";
import { onMounted, ref } from "vue";
import { NIcon } from "naive-ui";
import { Close, FitToScreen, Popup, Subtract } from "@vicons/carbon";

const isMaximized = ref(true);
onMounted(() => {
    ipcRenderer.invoke("isWindowBrowserMaximized").then((args: any) => {
        isMaximized.value = args;
    });
});

const minimize = () => {
    ipcRenderer.send("minimizeWindow");
};
const maximize = () => {
    ipcRenderer.invoke("maximizeWindow").then((args: any) => {
        isMaximized.value = args;
    });
};
const close = () => {
    ipcRenderer.send("closeWindow");
};
</script>

<template>
    <div class="flex justify-center items-center h-[100%]">
        <div id="minimizeButton" class="dark:hover:bg-gray-600 hover:bg-gray-400 h-[100%] px-[10px] flex justify-center items-center text-size-18px" @click="minimize()">
            <!-- <span class="codicon codicon-chrome-minimize"></span> -->
            <NIcon>
                <Subtract />
            </NIcon>
        </div>
        <div id="maximizeButton" class="dark:hover:bg-gray-600 hover:bg-gray-400 h-[100%] px-[10px] flex justify-center items-center text-size-18px" @click="maximize()">
            <!-- <span v-show="!isMaximized" class="codicon codicon-chrome-maximize"></span> -->
            <NIcon v-show="!isMaximized">
                <FitToScreen />
            </NIcon>
            <NIcon v-show="isMaximized">
                <Popup />
            </NIcon>
            <!-- <span v-show="isMaximized" class="codicon codicon-chrome-restore"></span> -->
        </div>
        <div id="closeButton" class="hover:bg-red-600 h-[100%] px-[10px] flex justify-center items-center text-size-18px" @click="close()">
            <NIcon>
                <Close />
            </NIcon>
        </div>
    </div>
</template>
