<template>
    <div class="h-[100%] flex">
        <div class="book-selection w-[100%] overflowing-div" @scroll="scrollBookSelection">
            <div v-for="book in storeBible.bibleBooks" :key="book.b" class="book-selection-item py-5px" :class="{ 'selected-active': book.b == storeBible.bookSelected }" @click="selectBook(book.b)">
                {{ book.n }}
            </div>
        </div>
        <div class="chapter-selection w-80px overflowing-div">
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
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import session from "@/service/session";

export default defineComponent({
    setup() {
        const store = useStore();
        const storeBible = computed(() => store.state.bible);

        const saveScrollTopState = (className: string, inArray = 0, sessionKey: string, scrollTopSubtract = 0): void => {
            let el = document.getElementsByClassName(className)[inArray];
            if (el instanceof HTMLElement) {
                session.set(sessionKey, el.offsetTop - scrollTopSubtract);
            }
        };

        const setScrollTopState = (className: string, sessionKey: string, setScrollTopValue = 0): void => {
            let el2 = document.getElementsByClassName(className)[0];
            if (el2 instanceof HTMLElement) {
                if (setScrollTopValue > 0) session.set(sessionKey, setScrollTopValue);
                el2.scrollTop = session.get(sessionKey) ? session.get(sessionKey) : 0;
            }
        };

        onMounted(() => {
            setTimeout(() => {
                setScrollTopState("book-selection", "bookSelectionScrollTop");
                setScrollTopState("chapter-selection", "chapterSelectionScrollTop");
            }, 100);
        });

        return {
            storeBible,
            selectBook: async (number: number) => {
                store.state.bible.bookSelected = number;
                store.state.bible.chapterSelected = 1;
                await store.dispatch("getBookChaptersCount", { bible: storeBible.value.bible, book: storeBible.value.bookSelected });
                await store.dispatch("getBookInChapter", { bible: storeBible.value.bible, book: storeBible.value.bookSelected, chapter: storeBible.value.chapterSelected });

                saveScrollTopState("selected-active", 0, "bookSelectionScrollTop");
                setScrollTopState("chapter-selection", "chapterSelectionScrollTop", 1);
            },
            selectChapter: async (number: number) => {
                storeBible.value.chapterSelected = number;
                await store.dispatch("getBookInChapter", { bible: storeBible.value.bible, book: storeBible.value.bookSelected, chapter: storeBible.value.chapterSelected });
                saveScrollTopState("selected-active", 1, "chapterSelectionScrollTop");
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
            @apply dark:bg-opacity-20 bg-opacity-20;
        }

        &:hover {
            @apply dark:bg-opacity-10 bg-opacity-30;
        }
    }
}
</style>