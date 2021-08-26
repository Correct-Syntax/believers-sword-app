<template>
    <div class="h-[100%] flex">
        <div class="book-selection w-[100%]">
            <div v-for="book in bibleBooks" :key="book.b" class="book-selection-item" :class="{ 'selected-active': book.b == bookSelected }" @click="selectBook(book.b)">{{ book.n }}</div>
        </div>
        <div class="chapter-selection w-80px">
            <div
                v-for="chapter in bookSelectedChapterCount"
                :key="chapter"
                class="chapter-selection-item text-center ml-7px py-5px"
                :class="{ 'selected-active': chapter == chapterSelected }"
                @click="selectChapter(chapter)"
            >
                {{ chapter }}
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { getBookChaptersCount, getBookInChapter } from "@/helper/ipcRendererSender/ipcRendererBibleSendEvent";

export default defineComponent({
    setup() {
        const store = useStore();
        const bookSelected = computed(() => store.state.bible.bookSelected);
        const bookSelectedChapterCount = computed(() => store.state.bible.bookSelectedChapterCount);

        return {
            bibleBooks: computed(() => store.state.bible.bibleBooks),
            bookSelected,
            bookSelectedChapterCount,
            chapterSelected: computed(() => store.state.bible.chapterSelected),
            selectBook: (number: number) => {
                store.state.bible.bookSelected = number;
                getBookChaptersCount(store.state.bible.bible, store.state.bible.bookSelected);
            },
            selectChapter: (number: number) => {
                store.state.bible.chapterSelected = number;
                getBookInChapter(store.state.bible.bible, store.state.bible.bookSelected, store.state.bible.chapterSelected);
            },
        };
    },
});
</script>
<style lang="scss">
.book-selection,
.chapter-selection {
    @apply h-[100%] overflow-y-auto pl-1px pr-10px flex flex-col gap-2px;
    .book-selection-item,
    .chapter-selection-item {
        @apply cursor-pointer dark:bg-gray-200 dark:bg-opacity-0 bg-gray-700 bg-opacity-0 px-5px;

        &.selected-active {
            @apply dark:bg-opacity-20;
        }

        &:hover {
            @apply dark:bg-opacity-10 bg-opacity-30;
        }
    }
}
</style>