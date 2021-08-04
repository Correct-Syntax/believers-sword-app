<template>
    <header
        id="titlebar"
        class="
            dark:bg-gray-800
            dark:text-gray-100
            text-size-[12px]
            flex
            w-[100%]
            justify-between
            whitespace-nowrap
            h-[var(--header-height)]
        "
    >
        <div class="p-[10px]">Believers Sword</div>
        <div
            id="drag-region"
            class="w-[100%] p-[10px]"
            style="cursor: move"
        ></div>
        <div class="flex">
            <div class="p-[10px] hover:bg-gray-600" @click="minimize()">
                <svg
                    class="fill-gray-50"
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                >
                    <path d="M5 11h14v2H5z"></path>
                </svg>
            </div>
            <div class="p-[10px] hover:bg-gray-600" @click="maximize()">
                <svg
                    class="fill-gray-50"
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                >
                    <path d="M5 12H3v9h9v-2H5zm7-7h7v7h2V3h-9z"></path>
                </svg>
            </div>
            <div class="p-[10px] hover:bg-red-600" @click="close()">
                <svg
                    class="fill-gray-50"
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"
                    ></path>
                </svg>
            </div>
        </div>
    </header>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ipcRenderer } from "electron"; 


export default defineComponent({
    setup() {
        return {
            minimize: () => {
                ipcRenderer.send('minimizeWindow');
            },
            maximize: () => {
                ipcRenderer.send('maximizeWindow');
            },
            close: () => {
                ipcRenderer.send('closeWindow');
            },
        };
    },
});
</script>

<style lang="scss">
#drag-region {
    -webkit-app-region: drag;
}
</style>