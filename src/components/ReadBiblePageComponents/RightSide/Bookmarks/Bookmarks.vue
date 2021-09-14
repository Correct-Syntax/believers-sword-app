<template>
    <div class="flex flex-col p-7px h-[100%] w-[100%] select-none">
        <div class="text-size-[18px] mb-7px">
            <h3>Your Bookmarks:</h3>
            <div class="mt-7px">
                <NSelect v-model:value="BibleBookSelected" size="small" :options="bibleBookOptions" placeholder="Select Bible Book" />
            </div>
        </div>
        <div v-if="savedBookmarks.length > 0" class="bookmarks-view-wrapper overflow-y-auto overflowing-div h-[100%]">
            <div
                v-for="bookmark in savedBookmarks"
                :key="bookmark.book_text + bookmark.book + bookmark.chapter + bookmark.verse"
                class="right-side-bookmark-saved-items"
                :class="{
                    'right-side-bookmark-selected': bookmark.book === selectedBookmark.b && bookmark.chapter === selectedBookmark.c && bookmark.verse === selectedBookmark.v,
                }"
                @click="goToVerse(bookmark)"
            >
                <div class="w-[100%] px-5px py-10px text-size-20px">{{ bookmark.book_text }} {{ bookmark.chapter }}:{{ bookmark.verse }}</div>
                <div class="flex gap-10px cursor-pointer text-size-18px px-10px">
                    <div class="opacity-50 hover:opacity-100" @click.stop.prevent>
                        <i class="bx bx-share-alt"></i>
                    </div>
                    <NPopconfirm :show-icon="false" placement="top-start" @positive-click="removeBookmark(bookmark)">
                        <template #activator>
                            <div class="opacity-50 hover:opacity-100 dark:text-red-400 text-red-600" @click.stop.prevent>
                                <i class="bx bx-trash"></i>
                            </div>
                        </template>
                        Delete Bookmark?
                    </NPopconfirm>
                </div>
            </div>
        </div>
        <div v-show="bookmarkCount > bookmarkLimit" class="pt-7px flex justify-end">
            <div>
                <NPagination v-model:page="bookmarkPage" :page-count="Math.ceil(bookmarkCount / bookmarkLimit)" :page-slot="5" />
            </div>
        </div>
        <div v-show="!savedBookmarks.length > 0" class="mt-30px">
            <NEmpty description="Add Bookmarks Here" />
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { NPopconfirm, NEmpty, NSelect, NPagination } from "naive-ui";
import { ipcRenderer } from "electron";

export default defineComponent({
    components: { NPopconfirm, NEmpty, NSelect, NPagination },
    setup() {
        const store = useStore();
        const savedBookmarks = computed(() => store.state.verseBookmark.savedBookmarks);
        const bibleState = computed(() => store.state.bible);
        const verseBookmark = computed(() => store.state.verseBookmark);
        const selectedBookmark = computed(() => store.state.verseBookmark.selectedBookmark);
        const BibleBookSelected = ref("all");
        const bookmarkPage = ref(1);
        const bookmarkCount = computed(() => store.state.verseBookmark.bookmarkTotalCount);
        const bookmarkLimit = ref(100);

        watch(bookmarkPage, (page) => {
            ipcRenderer.send("getVersesSavedBookmarks", { page, limit: bookmarkLimit.value });
        });

        watch(savedBookmarks, (saveBookmark) => {
            if (!saveBookmark.length && bookmarkPage.value > 1) {
                bookmarkPage.value = bookmarkPage.value - 1;
            }
        });

        watch(BibleBookSelected, (BookSelected) => {
            ipcRenderer.send("getVersesSavedBookmarks", { page: bookmarkPage.value, limit: bookmarkLimit.value, book: BookSelected === "all" ? null : BookSelected });
        });

        onMounted(() => {
            ipcRenderer.send("getVersesSavedBookmarks", { page: bookmarkPage.value, limit: bookmarkLimit.value });
        });

        const goToVerse = (verse: any) => {
            bibleState.value.bookSelected = verse.book;
            bibleState.value.chapterSelected = verse.chapter;
            verseBookmark.value.selectedBookmark = {
                b: verse.book,
                c: verse.chapter,
                v: verse.verse,
            };
        };
        const bibleBookOptions = computed(() => {
            let bibleBooks = store.state.bible.bibleBooks;
            let newData: any = [
                {
                    label: "All",
                    value: "all",
                },
            ];
            bibleBooks.forEach((item: any) =>
                newData.push({
                    label: item.n,
                    value: item.b,
                })
            );
            return newData;
        });

        return {
            bookmarkPage,
            BibleBookSelected,
            savedBookmarks,
            bibleBookOptions,
            bookmarkCount,
            bookmarkLimit,
            goToVerse,
            selectedBookmark,
            removeBookmark(verse: any) {
                if (verse.book && verse.chapter && verse.verse)
                    ipcRenderer.send("deleteVerseInSavedBookmarks", {
                        book: verse.book,
                        chapter: verse.chapter,
                        verse: verse.verse,
                        page: bookmarkPage.value,
                    });
            },
        };
    },
});
</script>
<style lang="postcss">
.bookmarks-view-wrapper {
    @apply flex flex-wrap gap-10px justify-center;
}
.right-side-bookmark-saved-items {
    @apply flex items-center flex-row gap-10px justify-between text-size-15px border-l-[5px]  border-opacity-0 border-light-50 duration-200 h-[40px] w-[100%] max-w-[320px];

    &.right-side-bookmark-selected {
        @apply border-[var(--primaryColor)];
    }

    &:hover {
        @apply dark:bg-gray-100 dark:bg-opacity-5 bg-gray-700 bg-opacity-5 cursor-pointer;
    }
}
</style>