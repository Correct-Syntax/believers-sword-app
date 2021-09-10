<template>
    <div class="my-20px mx-50px select-none">
        <div
            v-for="verse in viewBookChapter"
            :key="verse.v"
            class="verse-item relative"
            :class="{
                'item-bookmarked': checkIfVerseExistInBookmarkState(verse),
                'item-saved-in-bookmark': checkIfVerseExistInSavedBookmarks(verse),
                'saved-bookmark-selected': verse.b === selectedBookmark.b && verse.c === selectedBookmark.c && verse.v === selectedBookmark.v,
            }"
            @click="clickVerse(verse)"
        >
            <div class="item-bookmarked-dot invisible opacity-0 absolute right-[10px] top-[10px]">
                <div class="text-[var(--primaryColor)]">
                    <i class="bx bxs-circle"></i>
                </div>
            </div>
            <div class="read-chapter-verse-number">
                <span>{{ verse.v }}</span>
                <span class="item-saved-in-bookmark-mark">
                    <n-tooltip trigger="hover" placement="bottom-start">
                        <template #trigger>
                            <div>
                                <i class="bx bx-bookmarks"></i>
                            </div>
                        </template>
                        <div>This Verse is <b> Bookmarked</b></div>
                    </n-tooltip>
                </span>
            </div>
            <div v-if="verse.versions" class="w-[100%] max-w-1000px text-justify flex flex-col gap-15px">
                <div v-for="version in verse.versions" :key="version.version">
                    <div class="leading-relaxed" :style="`font-size: ${fontSize}px`">
                        <span class="verse-item-bible-version opacity-50 font-500 mr-7px">
                            <i> {{ getVersion(version.version) }}</i>
                        </span>
                        <span
                            class="select-text"
                            :data-key="`${version.version}:${verse.b}:${verse.c}:${verse.v}`"
                            :data-bible-version="version.version"
                            :data-book="verse.b"
                            :data-chapter="verse.c"
                            :data-verse="verse.v"
                            :data-text="version.text"
                            v-html="version.text"
                        ></span>
                    </div>
                </div>
            </div>
            <div class="verse-item-more-options">
                <NPopover trigger="hover" :show-arrow="false">
                    <template #trigger>
                        <div class="text-size-30px p-10px bg-gray-600 dark:text-gray-300 text-gray-100 rounded-[100%] cursor-pointer">
                            <i class="bx bx-dots-vertical-rounded"></i>
                        </div>
                    </template>
                    <div>
                        <div class="text-size-18px flex flex-col gap-[10px]">
                            <div class="cursor-pointer flex items-center gap-[7px] opacity-70 hover:opacity-100" @click="saveToBookmark(verse)">
                                <i class="bx bx-bookmark"></i>
                                <span>Bookmark</span>
                            </div>
                            <div class="cursor-pointer flex items-center gap-[7px] opacity-70 hover:opacity-100">
                                <i class="bx bx-share-alt"></i>
                                <span>Share Verse</span>
                            </div>
                        </div>
                    </div>
                </NPopover>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { NPopover, NTooltip, useMessage } from "naive-ui";
import { ipcRenderer } from "electron";

export default defineComponent({
    name: "VersesRender",
    props: ["viewBookChapter", "fontSize"],
    components: { NPopover, NTooltip },
    setup() {
        const store = useStore();
        const bibleBookMarkStore = computed(() => store.state.verseBookmark);
        const bibleStore = computed(() => store.state.bible);
        const savedBookmarks = computed(() => store.state.verseBookmark.savedBookmarks);
        const selectedBookmark = computed(() => store.state.verseBookmark.selectedBookmark);

        const getVersion = (table: string) => {
            let version = bibleStore.value.bibleVersions.filter((item: any) => item.table === table);
            return version ? version[0]?.abbreviation : "NONE";
        };
        const checkIfVerseExistInBookmarkState = (verse: any) => {
            return bibleBookMarkStore.value.bookmarks.filter((item: any) => item.b === verse.b && item.c === verse.c && item.v === verse.v).length > 0;
        };

        const checkIfVerseExistInSavedBookmarks = (verse: any) => {
            return savedBookmarks.value.filter((item: any) => item.b === verse.b && item.c === verse.c && item.v === verse.v).length > 0;
        };

        const bibleBooks = computed(() => store.state.bible.bibleBooks);
        const message = useMessage();
        const saveToBookmark = (verse: any) => {
            let newBookMark = [];
            let getBook = bibleBooks.value.filter((book: any) => book.b === verse.b)?.[0]?.n;
            newBookMark.push({
                b_text: getBook,
                b: verse.b,
                c: verse.c,
                v: verse.v,
            });

            ipcRenderer.send("saveVersesInBookmark", newBookMark);
            message.info("Bookmarked! Saved");
        };

        return {
            getVersion,
            clickVerse(verse: any) {
                if (checkIfVerseExistInBookmarkState(verse)) {
                    let index = bibleBookMarkStore.value.bookmarks.findIndex((item: any) => item.b === verse.b && item.c === verse.c && item.v === verse.v);
                    if (index >= 0) bibleBookMarkStore.value.bookmarks.splice(index, 1);
                } else {
                    bibleBookMarkStore.value.bookmarks.push(verse);
                }
            },
            checkIfVerseExistInBookmarkState,
            checkIfVerseExistInSavedBookmarks,
            selectedBookmark,
            saveToBookmark,
        };
    },
});
</script>
<style lang="postcss">
.verse-item {
    @apply flex items-center justify-between w-[100%] gap-20px mb-20px cursor-default p-20px dark:bg-gray-100 bg-gray-800 dark:bg-opacity-0 bg-opacity-0 dark:hover:bg-opacity-3 hover:bg-opacity-5 border dark:border-gray-800 border-gray-50;

    &.item-bookmarked {
        @apply border rounded-xl border-[var(--primaryColor)];

        .item-bookmarked-dot {
            @apply opacity-100 visible;
        }
        .read-chapter-verse-number {
            @apply text-[var(--primaryColor)] opacity-70;
        }
        .verse-item-bible-version {
            @apply text-[var(--primaryColor)];
        }
    }

    .item-saved-in-bookmark-mark {
        @apply hidden;
    }

    &.saved-bookmark-selected {
        .item-bookmarked-dot {
            @apply opacity-100 visible;
        }
    }

    &.item-saved-in-bookmark {
        .item-saved-in-bookmark-mark {
            @apply block;
        }
    }

    .read-chapter-verse-number {
        @apply w-[100%] max-w-[60px] flex flex-col gap-10px justify-center items-center text-size-30px font-700 opacity-30 duration-150;
    }

    .verse-item-more-options {
        @apply opacity-0 invisible duration-150;
    }

    &:hover {
        .verse-item-more-options {
            @apply opacity-30 visible;
            &:hover {
                @apply dark:opacity-90 opacity-70;
            }
        }

        .read-chapter-verse-number {
            @apply opacity-100;
        }
    }
}
</style>