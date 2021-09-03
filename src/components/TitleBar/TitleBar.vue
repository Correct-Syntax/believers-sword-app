<template>
    <header id="titlebar" class="dark:bg-gray-900 dark:text-gray-300 text-gray-800 bg-gray-50 flex w-[100%] justify-between whitespace-nowrap h-[var(--header-height)] items-center">
        <div class="flex items-center gap-9px w-400px h-[100%]">
            <div class="pl-[10px] w-30px">
                <img src="@/assets/logo54x54.png" class="h-10px w-30px" alt="Icon Logo" />
            </div>
            <div class="text-size-[12px] font-700">Believers Sword</div>
        </div>
        <div id="drag-region" class="w-[100%] p-[10px]" style="cursor: move"></div>
        <div class="text-size-12px mr-10px h-[100%]">
            <div class="cursor-pointer h-[100%] px-10px flex justify-center items-center text-size-18px" @click="changeTheme()">
                <i v-show="dark" class="bx bx-sun"></i>
                <i v-show="!dark" class="bx bxs-moon"></i>
            </div>
        </div>
        <div class="flex justify-center items-center h-[100%]">
            <div id="minimizeButton" class="dark:hover:bg-gray-600 hover:bg-gray-400 h-[100%] px-[10px] flex justify-center items-center" @click="minimize()">
                <i class="bx bx-minus"></i>
            </div>
            <div id="maximizeButton" class="dark:hover:bg-gray-600 hover:bg-gray-400 h-[100%] px-[10px] flex justify-center items-center" @click="maximize()">
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
import session from "@/service/session";

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

                session.set(localStorageThemeKey, store.state.dark ? "dark" : "light");
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