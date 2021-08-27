<template>
    <div class="h-[100vh]" :class="{ dark: dark }">
        <TitleBar />
        <div class="dark:bg-gray-800 dark:text-gray-300 text-gray-700 bg-gray-50 h-[calc(100%-30px)] overflow-y-auto">
            <MainView />
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from "vue";
import TitleBar from "./components/TitleBar/TitleBar.vue";
import MainView from "./views/Main.vue";
import { useStore } from "vuex";
import { setReadBiblePage } from '@/helper/onMountedEvents'

export default defineComponent({
    name: "App",
    components: { TitleBar, MainView },
    setup() {
        const store = useStore();

        onBeforeMount(async () => {
            await setReadBiblePage(store);
        });

        return {
            dark: computed(() => store.state.dark),
        };
    },
});
</script>
