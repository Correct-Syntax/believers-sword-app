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
import { webFrame } from "electron";
import session from "./service/session";

export default defineComponent({
    name: "App",
    components: { TitleBar, MainView, NConfigProvider },
    setup() {
        const store = useStore();
        const dark = computed(() => store.state.dark);
        const themeOverrides = reactive({
            common: {
                primaryColor: "#22577A",
                primaryColorHover: "#22577A",
                primaryColorPressed: "#5acea7",
                primaryColorSuppl: "rgb(42, 148, 125)",
                popoverColor: "rgba(55, 65, 81, 1)",
            },
            dark: {
                primaryColor: "#22577A",
            },
        });
        const zoomLevel = computed(() => store.state.frame.zoomLevel)

        const changeTheme = () => {
            themeOverrides.common.primaryColor = dark.value ? "#3cb1ff" : "#2672a5";
            themeOverrides.common.popoverColor = dark.value ? "rgba(55, 65, 81, 1)" : "rgba(255, 255, 255, 1)";
        };

        onBeforeMount(async () => {
            await setReadBiblePage(store);

            let sessionZoom = session.get("webFrameZoom");
            if (!sessionZoom) session.set("webFrameZoom", 1);
            webFrame.setZoomFactor(sessionZoom ? sessionZoom : 1);
            store.state.frame.zoomLevel = sessionZoom ? sessionZoom : 1;

            changeTheme();
        });

        watch(dark, () => changeTheme());
        watch(zoomLevel, () => {
            session.set("webFrameZoom", zoomLevel.value)
            webFrame.setZoomFactor(zoomLevel.value);
        })

        return {
            dark,
            themeOverrides,
            darkTheme,
        };
    },
});
</script>

<style lang="scss">
.none-just-testing {
    color: #2672a5;
}
</style>