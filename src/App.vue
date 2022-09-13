<script lang="ts" setup>
import { NConfigProvider } from "naive-ui";
import { computed, onBeforeMount, onMounted, reactive, ref, watch } from "vue";
import TitleBar from "./components/TitleBar/TitleBar.vue";
import MainView from "./views/Main.vue";
import { useStore } from "vuex";
import { onMountedRendererEvents } from "@/service/ipcRenderer";
import { darkTheme } from "naive-ui";
import { webFrame } from "electron";
import session from "./service/session/session";
import LeftSideMenuBar from "@/components/leftSideMenuBar/leftSideMenuBar.vue";
import { NMessageProvider, NNotificationProvider, NDialogProvider } from "naive-ui";
import { AutoUpdateRendererEvents } from "@/service/AutoUpdater/AutoUpdaterRendererProcessEvents";
import { ipcRenderer } from "electron";
import { PrayerListIpcRenderer } from "./IpcRendererOnEvents/IpcRendererOnEvents";
import { useUserStore } from "./store/user";
import { supabase } from "./service/SupaBase/supabase";

const userStore = useUserStore();
const store = useStore();
const dark = computed(() => store.state.dark);
const showAllContent = ref(false);
const primaryColors = computed(() => store.state.primaryColors);
const themeOverrides = reactive({
    common: {
        primaryColor: "#22577A",
        primaryColorHover: "#22577A",
        primaryColorPressed: "#5acea7",
        primaryColorSuppl: "rgb(42, 148, 125)",
        popoverColor: "rgba(55, 65, 81, 1)",
        modalColor: "rgba(55, 65, 81, 1)",
        cardColor: "rgba(255, 255, 255, 1)",
    },
    dark: {
        primaryColor: "#22577A",
    },
});
const zoomLevel = computed(() => store.state.frame.zoomLevel);

const changePrimaryColors = () => {
    themeOverrides.common.primaryColor = dark.value
        ? primaryColors.value.primaryColorDark
        : primaryColors.value.primaryColorLight;
    themeOverrides.common.primaryColorHover = dark.value
        ? primaryColors.value.primaryColorDark
        : primaryColors.value.primaryColorLight;
    themeOverrides.common.primaryColorSuppl = dark.value
        ? primaryColors.value.primaryColorDark
        : primaryColors.value.primaryColorLight;
    themeOverrides.common.popoverColor = dark.value ? "rgba(55, 65, 81, 1)" : "rgba(255, 255, 255, 1)";
    themeOverrides.common.modalColor = dark.value ? "rgba(55, 65, 81, 1)" : "rgba(255, 255, 255, 1)";
    themeOverrides.common.cardColor = dark.value ? "rgba(31, 41, 55, 1)" : "rgba(255, 255, 255, 1)";

    if (dark.value) document.documentElement.style.setProperty("--primaryColor", primaryColors.value.primaryColorDark);
    else document.documentElement.style.setProperty("--primaryColor", primaryColors.value.primaryColorLight);
};

const changeTheme = async () => {
    changePrimaryColors();
    let themeProperty = dark.value ? "dark" : "light";
    document.documentElement.setAttribute("theme", themeProperty);
};

onBeforeMount(async () => {
    await onMountedRendererEvents(store);
    changeTheme();
    AutoUpdateRendererEvents();
    if (session.get("session")) {
        userStore.setSession(session.get("session"));
    } else {
        const userSession = supabase.auth.session();
        if (userSession) {
            session.set("session", userSession);
        }
    }
});

onMounted(async () => {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key.toLowerCase() === "a") {
            e.preventDefault();
        }
    });

    const savedRightSideWidth = await session.get("viewChapterRightSideBarWidth");
    if (!savedRightSideWidth) {
        session.set("viewChapterRightSideBarWidth", 300);
    }

    let sessionZoom = session.get("webFrameZoom");
    webFrame.setZoomFactor(sessionZoom ? sessionZoom : 1);
    store.state.frame.zoomLevel = sessionZoom ? sessionZoom : 1;

    let doc = document.getElementsByTagName("body")[0];
    if (dark.value) doc.classList.add("dark");

    ipcRenderer.invoke("getPrimaryColors").then((response: any) => {
        store.state.primaryColors = response;
    });

    PrayerListIpcRenderer();

    setTimeout(() => {
        showAllContent.value = true;
    }, 200);
});

watch(dark, () => {
    changeTheme();
    changePrimaryColors();
    let doc = document.getElementsByTagName("body")[0];
    if (dark.value) doc.classList.add("dark");
    if (!dark.value) doc.classList.remove("dark");
});

watch(zoomLevel, () => {
    webFrame.setZoomFactor(zoomLevel.value);
});

watch(primaryColors, () => {
    changePrimaryColors();
});
</script>

<template>
    <NConfigProvider :theme-overrides="themeOverrides" :theme="dark ? darkTheme : null">
        <NDialogProvider>
            <NNotificationProvider>
                <NMessageProvider placement="bottom-right">
                    <div
                        class="h-[100vh] w-[100%] dark:bg-gray-800 dark:text-gray-300 text-gray-700 bg-gray-50 flex flex-col"
                    >
                        <TitleBar />
                        <div
                            class="dark:bg-gray-800 dark:text-gray-300 text-gray-700 bg-gray-50 h-[calc(100%-30px)] w-[100%] overflow-y-hidden opacity-0"
                            :class="{ 'opacity-100': showAllContent }"
                        >
                            <LeftSideMenuBar />
                            <MainView />
                        </div>
                    </div>
                </NMessageProvider>
            </NNotificationProvider>
        </NDialogProvider>
    </NConfigProvider>
</template>

<style lang="postcss">
.ProseMirror {
    @apply h-[100%];
}
.ProseMirror,
.prayer-list,
.prayer-list-content,
.post-content {
    s {
        text-decoration: line-through;
        text-decoration-color: red;
        text-decoration-thickness: 3px;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        @apply leading-normal m-0 pb-3;
    }

    h1 {
        @apply text-size-25px font-600;
    }
    h2 {
        @apply text-size-20px font-600;
    }
    h3 {
        @apply text-size-17px font-600;
    }
    h4 {
        @apply text-size-14px font-600;
    }
    h5 {
        @apply text-size-12px font-600;
    }
    h6 {
        @apply text-size-10px font-600;
    }

    p {
        @apply text-size-15px !leading-normal;
    }

    & > p {
        margin-block-end: 1em;
    }

    ol,
    ul {
        @apply text-size-14px py-5px my-5px;
    }

    ol {
        display: block;
        list-style-type: decimal;
        padding-inline-start: 40px;
    }

    ul {
        display: block;
        list-style-type: disc;
        padding-inline-start: 40px;
    }

    pre {
        @apply text-size-18px dark:bg-dark-900 bg-gray-700 py-10px px-10px dark:text-gray-300 text-gray-100 rounded-md font-mono m-0;

        code {
            color: inherit;
            padding: 0;
            background: none;
        }
    }

    blockquote {
        @apply pl-[30px] py-[20px] border-l-[5px] dark:border-gray-100 border-gray-600 dark:bg-light-50 bg-gray-600 dark:bg-opacity-05 bg-opacity-10;
    }

    p.is-editor-empty:first-child::before {
        @apply dark:opacity-30 dark:text-gray-400 text-gray-400;
        content: attr(data-placeholder);
        float: left;
        pointer-events: none;
        height: 0;
    }
}
</style>
