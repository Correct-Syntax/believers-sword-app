<template>
    <div id="main-container" class="main-container flex h-[100%] flex-col">
        <div class="w-[100%] pl-40px pr-5px" style="height: calc(100% - var(--header-height) + 4px)">
            <div class="h-[100%] w-[100%]">
                <div id="main-container-wrapper" class="h-[100%] w-[100%] relative pr-35px" v-show="readBibleIsSelected">
                    <ReadBible />
                </div>
                <div v-if="!readBibleIsSelected" class="h-[100%] w-[100%] relative dark:bg-black dark:bg-opacity-20 bg-gray-200">
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <div class="dark:bg-gray-900 bg-gray-50 px-[7px] py-[2px]">
            <Footer />
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import Footer from "@/components/footer/Footer.vue";
import ReadBible from "./pages/ReadBible.vue";
import { useStore } from "vuex";

export default defineComponent({
    name: "MainView",
    components: { Footer, ReadBible },
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
    --left-bar-width: 36px;
}
#main-container-wrapper {
    --left-width: 300px;
}
</style>