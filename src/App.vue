<template>
    <NConfigProvider :theme="store.state.theme == 'dark' ? darkTheme : null">
        <NLayout
            class="min-h-screen"
            :class="{ dark: store.state.theme == 'dark' }"
        >
            <Header />
            <div class="main-page-contents">
                <router-view />
            </div>
        </NLayout>
    </NConfigProvider>
</template>
<script lang="ts">
import Header from "./components/Header/Header.vue";
import { NConfigProvider, darkTheme, NLayout } from "naive-ui";
import { useStore } from "vuex";
export default {
    components: {
        Header,
        NConfigProvider,
        NLayout,
    },
    setup() {
        const store = useStore();
        let isThemeSaveInLocalStorage = localStorage.getItem("bs-theme");
        if (isThemeSaveInLocalStorage)
            store.state.theme = isThemeSaveInLocalStorage;

        return {
            darkTheme,
            store,
        };
    },
};
</script>
<style lang="scss">
.main-page-contents {
    padding-top: calc(var(--nav-height));
}
</style>
