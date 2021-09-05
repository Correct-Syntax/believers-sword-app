<template>
    <div id="main-container" class="main-container flex h-[100%] flex-col">
        <NMessageProvider placement="bottom-right">
            <div class="h-[100%] w-[100%] relative pr-40px">
                <div class="absolute h-[100%] w-[var(--left-bar-width)]">
                    <LeftSideMenuBar />
                </div>
                <div id="main-container-wrapper" class="h-[100%] relative">
                    <div class="h-[100%]" v-show="readBibleIsSelected">
                        <ReadBible />
                    </div>
                    <div v-if="!readBibleIsSelected" class="h-[100%] relative">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </NMessageProvider>
        <div class="dark:bg-gray-900 bg-gray-50 px-[7px] py-[2px]">
            <Footer />
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import LeftSideMenuBar from "@/components/leftSideMenuBar/leftSideMenuBar.vue";
import Footer from "@/components/footer/Footer.vue";
import ReadBible from "./pages/ReadBible.vue";
import { useStore } from "vuex";
import { NMessageProvider } from "naive-ui";
export default defineComponent({
    name: "MainView",
    components: { LeftSideMenuBar, Footer, ReadBible, NMessageProvider },
    setup() {
        const store = useStore();
        const readBibleIsSelected = computed(() => store.state.readBibleMenuSelected);
        return {
            readBibleIsSelected,
        };
    },
});
</script>
<style lang="scss">
#main-container {
    --left-bar-width: 37px;
}
#main-container-wrapper {
    --left-width: 300px;
    left: var(--left-bar-width);
    width: calc(100% - var(--left-bar-width));
}
</style>