<template>
    <header id="titlebar" class="dark:bg-gray-800 dark:text-gray-100 bg-gray-200 flex w-[100%] justify-between whitespace-nowrap h-[var(--header-height)] items-center">
        <div class="flex items-center gap-9px w-400px h-[100%]">
            <div class="pl-[10px] w-30px">
                <img src="@/assets/logo54x54.png" class="h-10px w-30px" alt="Icon Logo" />
            </div>
            <div class="text-size-[12px] font-700">Believers Sword</div>
            <div class="text-size-12px flex gap-8px h-[100%]">
                <div class="flex justify-center items-center px-5px cursor-default bg-opacity-0 hover:bg-light-50 hover:bg-opacity-10 h-[100%]">
                    <span> Preferences </span>
                </div>
                <div class="flex justify-center items-center px-5px cursor-default bg-opacity-0 hover:bg-light-50 hover:bg-opacity-10 h-[100%]">
                    <span> Help </span>
                </div>
            </div>
        </div>
        <div id="drag-region" class="w-[100%] p-[10px]" style="cursor: move"></div>
        <div class="text-size-12px mr-20px h-[100%]">
            <div class="cursor-pointer h-[100%] px-10px flex justify-center items-center text-size-20px" @click="changeTheme()">
                <i v-show="dark" class="bx bx-sun"></i>
                <i v-show="!dark" class="bx bxs-moon"></i>
            </div>
        </div>
        <div class="flex justify-center items-center h-[100%]">
            <div id="minimizeButton" class="hover:bg-gray-600 h-[100%] px-[10px] flex justify-center items-center" @click="minimize()">
                <i class="bx bx-minus"></i>
            </div>
            <div id="maximizeButton" class="hover:bg-gray-600 h-[100%] px-[10px] flex justify-center items-center" @click="maximize()">
                <i class="bx bx-expand-alt"></i>
            </div>
            <div id="closeButton" class="hover:bg-red-600 h-[100%] px-[10px] flex justify-center items-center" @click="close()">
                <i class="bx bx-x"></i>
            </div>
        </div>
    </header>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { ipcRenderer } from "electron";
import { useStore } from "vuex";
import { localStorageThemeKey } from "@/service/ThemeChangeService";
import session from '@/helper/session'

export default defineComponent({
    setup() {
        const store = useStore();

        return {
            minimize: () => {
                ipcRenderer.send("minimizeWindow");
            },
            maximize: () => {
                ipcRenderer.send("maximizeWindow");
            },
            close: () => {
                ipcRenderer.send("closeWindow");
            },
            changeTheme: () => {
                store.state.dark = !store.state.dark;

                session.set(localStorageThemeKey, store.state.dark ? "dark" : "light")
            },
            dark: computed(() => store.state.dark),
        };
    },
});
</script>

<style lang="scss">
#drag-region {
    -webkit-app-region: drag;
}

#minimizeButton,
#maximizeButton,
#closeButton {
    -webkit-app-region: no-drag;
    cursor: pointer !important;
}
</style>