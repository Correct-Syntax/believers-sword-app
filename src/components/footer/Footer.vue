<template>
    <div>
        <div class="flex justify-between whitespace-nowrap items-center">
            <div class="select-none w-350px">
                <LeftSideFooter />
            </div>
            <div class="w-350px flex justify-center items-center gap-10px dark:text-[var(--primaryColor)] text-[var(--primaryColor)] font-700 cursor-pointer" @click="gotoBibleRead()">
                <div>{{ bibleBook(bibleStore.bookSelected) }}</div>
                <div>{{ bibleStore.chapterSelected }}</div>
            </div>
            <div class="select-none w-350px flex justify-end">
                <ZoomScaleOption />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import LeftSideFooter from "@/components/footer/LestSideFooter/LeftSideFooter.vue";
import ZoomScaleOption from "./ZoomScale/ZoomScale.vue";
export default defineComponent({
    name: "MainView",
    components: { LeftSideFooter, ZoomScaleOption },
    setup() {
        const store = useStore();
        const bibleStore = computed(() => store.state.bible);

        return {
            bibleStore,
            bibleBook: (number: number) => {
                let books = bibleStore.value.bibleBooks;
                return books.filter((item: null | { b: number }) => item?.b == number)[0]?.n;
            },
            gotoBibleRead() {
                store.state.readBibleMenuSelected = true;
            },
        };
    },
});
</script>