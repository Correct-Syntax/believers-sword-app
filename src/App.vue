<template>
    <div class="h-[100vh]" :class="{ dark: dark }">
        <TitleBar />
        <div class="dark:bg-gray-800 dark:text-gray-300 text-gray-800 bg-gray-50 h-[calc(100%-30px)] overflow-y-auto">
            <MainView />
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from "vue";
import TitleBar from "./components/TitleBar/TitleBar.vue";
import MainView from "./views/Main.vue";
import { localStorageThemeKey } from "@/service/ThemeChangeService";
import { useStore } from "vuex";
import session from '@/helper/session'
import { setReadBiblePage } from '@/helper/onMountedEvents'
import { getBookInChapter } from "./helper/ipcRendererSender/ipcRendererBibleSendEvent";

export default defineComponent({
    name: "App",
    components: { TitleBar, MainView },
    setup() {
        const store = useStore();

        onBeforeMount(() => {
            const theme = session.get(localStorageThemeKey);
            if (theme) {
                store.state.dark = theme === "light" ? false : true;
            }
            setReadBiblePage(store);
            getBookInChapter(store.state.bible.bible, store.state.bible.bookSelected, store.state.bible.chapterSelected);
        });

        return {
            dark: computed(() => store.state.dark),
        };
    },
});
</script>
