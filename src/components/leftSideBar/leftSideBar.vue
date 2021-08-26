<template>
    <div class="h-[100%] flex">
        <div class="book-selection w-[100%]">
            <div v-for="book in storeBible.bibleBooks" :key="book.b" class="book-selection-item py-5px" :class="{ 'selected-active': book.b == storeBible.bookSelected }" @click="selectBook(book.b)">{{ book.n }}</div>
        </div>
        <div class="chapter-selection w-80px">
            <div
                v-for="chapter in storeBible.bookSelectedChapterCount"
                :key="chapter"
                class="chapter-selection-item text-center ml-7px py-5px"
                :class="{ 'selected-active': chapter == storeBible.chapterSelected }"
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
        const storeBible = computed(() => store.state.bible)

        return {
            storeBible,
            selectBook: (number: number) => {
                store.state.bible.bookSelected = number;
                store.state.bible.chapterSelected = 1;
                getBookChaptersCount(storeBible.value.bible, storeBible.value.bookSelected);
                getBookInChapter(storeBible.value.bible, storeBible.value.bookSelected, 1);
            },
            selectChapter: (number: number) => {
                storeBible.value.chapterSelected = number;
                getBookInChapter(storeBible.value.bible, storeBible.value.bookSelected, storeBible.value.chapterSelected);
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