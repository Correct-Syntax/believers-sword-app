<template>
    <div class="flex justify-center items-center h-[100%]">
        <div id="minimizeButton" class="dark:hover:bg-gray-600 hover:bg-gray-400 h-[100%] px-[10px] flex justify-center items-center text-size-18px" @click="minimize()">
            <span v-show="isMaximized" class="codicon codicon-chrome-minimize"></span>
        </div>
        <div id="maximizeButton" class="dark:hover:bg-gray-600 hover:bg-gray-400 h-[100%] px-[10px] flex justify-center items-center text-size-18px" @click="maximize()">
            <span v-show="isMaximized" class="codicon codicon-chrome-maximize"></span>
            <span v-show="!isMaximized" class="codicon codicon-chrome-restore"></span>
        </div>
        <div id="closeButton" class="hover:bg-red-600 h-[100%] px-[10px] flex justify-center items-center text-size-18px" @click="close()">
            <span class="codicon codicon-chrome-close"></span>
        </div>
    </div>
</template>
<script lang="ts">
import { ipcRenderer } from "electron";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
    setup() {
        const isMaximized = ref(true);
        onMounted(() => {
            ipcRenderer.on("isMaximized", () => {
                isMaximized.value = true
            });
            ipcRenderer.on("windowUnmaximized", () => {
                isMaximized.value = false
            })
        });

        return {
            isMaximized,
            minimize: () => {
                ipcRenderer.send("minimizeWindow");
            },
            maximize: () => {
                ipcRenderer.send("maximizeWindow");
            },
            close: () => {
                ipcRenderer.send("closeWindow");
            },
        };
    },
});
</script>
