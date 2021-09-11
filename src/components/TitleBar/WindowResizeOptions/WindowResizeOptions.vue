<template>
    <div class="flex justify-center items-center h-[100%]">
        <div id="minimizeButton" class="dark:hover:bg-gray-600 hover:bg-gray-400 h-[100%] px-[10px] flex justify-center items-center text-size-18px" @click="minimize()">
            <i class="bx bx-minus"></i>
        </div>
        <div id="maximizeButton" class="dark:hover:bg-gray-600 hover:bg-gray-400 h-[100%] px-[10px] flex justify-center items-center text-size-18px" @click="maximize()">
            <i v-show="isMaximized" class='bx bx-windows'></i>
            <i v-show="!isMaximized" class='bx bx-window' ></i>
        </div>
        <div id="closeButton" class="hover:bg-red-600 h-[100%] px-[10px] flex justify-center items-center text-size-18px" @click="close()">
            <i class="bx bx-x"></i>
        </div>
    </div>
</template>
<script lang="ts">
import { ipcRenderer } from "electron";
import { defineComponent, onMounted, ref } from "vue";
// import Icon from "@/components/Icon/Icon.vue";

export default defineComponent({
    // components: { Icon },
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
