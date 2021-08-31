<template>
    <n-config-provider :theme-overrides="themeOverrides" :theme="dark ? darkTheme : null">
        <div class="h-[100vh]" :class="{ dark: dark }">
            <TitleBar />
            <div class="dark:bg-gray-800 dark:text-gray-300 text-gray-700 bg-gray-50 h-[calc(100%-30px)] overflow-y-auto">
                <MainView />
            </div>
        </div>
    </n-config-provider>
</template>

<script lang="ts">
import { NConfigProvider } from "naive-ui";
import { computed, defineComponent, onBeforeMount, reactive, watch } from "vue";
import TitleBar from "./components/TitleBar/TitleBar.vue";
import MainView from "./views/Main.vue";
import { useStore } from "vuex";
import { setReadBiblePage } from "@/service/onMountedEvents";
import { darkTheme } from "naive-ui";

export default defineComponent({
    name: "App",
    components: { TitleBar, MainView, NConfigProvider },
    setup() {
        const store = useStore();
        const dark = computed(() => store.state.dark)
        const themeOverrides = reactive({
            common: {
                primaryColor: "#22577A",
                popoverColor: "rgba(55, 65, 81, 1)",
            },
        });

        onBeforeMount(async () => {
            await setReadBiblePage(store);
        });

        watch(dark, () => {
            themeOverrides.common.popoverColor = dark.value ? "rgba(55, 65, 81, 1)" : "#fff"
        })

        return {
            dark,
            themeOverrides,
            darkTheme,
        };
    },
});
</script>
