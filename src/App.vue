<template>
    <n-config-provider :theme-overrides="themeOverrides" :theme="dark ? darkTheme : null">
        <div class="h-[100vh]" :class="{ dark: dark, light: !dark }">
            <TitleBar />
            <div class="dark:bg-gray-800 dark:text-gray-300 text-gray-700 bg-gray-50 h-[calc(100%-30px)] overflow-y-auto">
                <LeftSideMenuBar />
                <MainView />
                <rightSideMenuBar />
            </div>
        </div>
    </n-config-provider>
</template>

<script lang="ts">
import { NConfigProvider } from "naive-ui";
import { computed, defineComponent, onBeforeMount, onMounted, reactive, watch } from "vue";
import TitleBar from "./components/TitleBar/TitleBar.vue";
import MainView from "./views/Main.vue";
import { useStore } from "vuex";
import { setReadBiblePage } from "@/service/onMountedEvents";
import { darkTheme } from "naive-ui";
import { webFrame } from "electron";
import session from "./service/session";
import LeftSideMenuBar from "@/components/leftSideMenuBar/leftSideMenuBar.vue";
import RightSideMenuBar from "@/components/rightSideMenuBar/rightSideMenuBar.vue"

export default defineComponent({
    name: "App",
    components: { TitleBar, MainView, NConfigProvider, LeftSideMenuBar, RightSideMenuBar },
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
        const zoomLevel = computed(() => store.state.frame.zoomLevel);

        const changeTheme = () => {
            themeOverrides.common.primaryColor = dark.value ? "#3cb1ff" : "#0084dc";
            themeOverrides.common.primaryColorHover = dark.value ? "#3cb1ff" : "#0084dc";
            themeOverrides.common.popoverColor = dark.value ? "rgba(55, 65, 81, 1)" : "rgba(255, 255, 255, 1)";
            let themeProperty = dark.value ? 'dark' : 'light';
            document.documentElement.setAttribute("theme", themeProperty);
        };

        onBeforeMount(async () => {
            await setReadBiblePage(store);

            changeTheme();
        });

        onMounted(() => {
            let sessionZoom = session.get("webFrameZoom");
            webFrame.setZoomFactor(sessionZoom ? sessionZoom : 1);
            store.state.frame.zoomLevel = sessionZoom ? sessionZoom : 1;
        });

        watch(dark, () => changeTheme());
        watch(zoomLevel, () => {
            webFrame.setZoomFactor(zoomLevel.value);
        });

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
    color: rgba(255, 255, 255, 1);
}
</style>