<template>
    <div id="main-container" class="main-container flex h-[100%] flex-col">
        <div class="h-[100%] w-[100%] relative pr-7px">
            <div class="absolute h-[100%] w-[var(--left-bar-width)]">
                <LeftSideMenuBar />
            </div>
            <div id="main-container-wrapper" class="h-[100%] relative">
                <router-view></router-view>
            </div>
        </div>
        <div class="dark:bg-gray-900 bg-gray-300 px-[7px] py-[2px]">
            <div>
                <div class="flex justify-between whitespace-nowrap">
                    <div>
                        left side
                    </div>
                    <div class="flex justify-center items-center gap-10px">
                        <div>{{bibleBook(bibleStore.bookSelected)}}</div>
                        <div>{{bibleStore.chapterSelected}}</div>
                    </div>
                    <div>
                        right side
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import LeftSideMenuBar from "@/components/leftSideMenuBar/leftSideMenuBar.vue";
import { useStore } from "vuex";
export default defineComponent({
    name: "MainView",
    components: { LeftSideMenuBar },
    setup() {
        const store = useStore()
        const bibleStore = computed(() => store.state.bible)
        return {
            bibleStore,
            bibleBook: (number: number) => {
                let books = bibleStore.value.bibleBooks
                return books.filter((item: null | { b: number; }) => item?.b == number)[0]?.n
            }
        }
    }
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