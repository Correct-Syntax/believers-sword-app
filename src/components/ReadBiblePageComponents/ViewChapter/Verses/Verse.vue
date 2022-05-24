<script lang="ts" setup>
import { ipcRenderer } from "electron";
import { useMessage } from "naive-ui";
import { computed } from "vue";
import { useStore } from "vuex";
import { cloneDeep } from "lodash";
import SaveClipNote from "./SaveClipNote/SaveClipNote.vue";
import VerseClipNote from "./SaveClipNote/verseClipNotes/verseClipNotes.vue";
import { NTooltip, NIcon } from "naive-ui";
import { CircleFilled, BookmarkFilled, BookmarkAdd } from "@vicons/carbon";

// eslint-disable-next-line
const { clipNote, verse, fontSize } = defineProps(["clipNote", "verse", "fontSize"]);

const store = useStore();
const bibleBookMarkStore = computed(() => store.state.verseBookmark);
const savedBookmarks = computed(() => store.state.verseBookmark.savedBookmarks);
const bibleBooks = computed(() => store.state.bible.bibleBooks);
const bibleStore = computed(() => store.state.bible);
const MarkerHighlights = computed(() => store.state.marker);
const message = useMessage();
const selectedBookmark = computed(() => store.state.verseBookmark.selectedBookmark);

const checkIfVerseExistInBookmarkState = (verse: any) => {
    return bibleBookMarkStore.value.bookmarks.filter((item: any) => item.b === verse.b && item.c === verse.c && item.v === verse.v).length > 0;
};

const checkIfVerseExistInSavedBookmarks = (verse: any) => {
    return savedBookmarks.value[`${verse.b}_${verse.c}_${verse.v}`];
};

const getVersion = (table: string) => {
    let version = bibleStore.value.bibleVersions.filter((item: any) => item.table === table);
    return version ? version[0]?.abbreviation : "NONE";
};

const checkHighlight = ({ key, orig }: any) => {
    let marked = MarkerHighlights.value.highlights[key];
    if (!marked) return String(orig).replace("<pb>", "").replace("<pb/>", "");
    return marked.content;
};

const saveToBookmark = (verse: any) => {
    let newBookMark = [];
    let getBook = bibleBooks.value.filter((book: any) => book.b === verse.b)?.[0]?.n;
    newBookMark.push({
        b_text: getBook,
        b: verse.b,
        c: verse.c,
        v: verse.v,
        versions: cloneDeep(verse.versions),
    });

    ipcRenderer.invoke("saveVersesInBookmark", newBookMark).then((bookmarks: any) => {
        store.dispatch("getVersesInBookmarkResult", bookmarks);
    });
    message.info("Bookmarked! Saved");
};

function checkHere(): void {
    // eslint-disable-next-line
    const el: HTMLElement = this;
    el.addEventListener("keydown", function (event: KeyboardEvent) {
        var key = event.key;
        var ctrl = event.ctrlKey ? true : false;

        if (key.toUpperCase() == "C" && ctrl) {
            const selected = window.getSelection();
            const text: string | undefined = selected?.toString();
            if (text) navigator.clipboard.writeText(text);
        } else {
            event.preventDefault();
        }
    });
}

function clickVerse(verse: any) {
    if (checkIfVerseExistInBookmarkState(verse)) {
        let index = bibleBookMarkStore.value.bookmarks.findIndex((item: any) => item.b === verse.b && item.c === verse.c && item.v === verse.v);
        if (index >= 0) bibleBookMarkStore.value.bookmarks.splice(index, 1);
    } else {
        let getBook = bibleBooks.value.filter((book: any) => book.b === verse.b)?.[0]?.n;
        let toAdd = verse;
        toAdd.b_text = getBook;
        bibleBookMarkStore.value.bookmarks.push(toAdd);
    }
}
</script>
<template>
    <div
        class="verse-item relative cursor-pointer relative pr-80px rounded-md"
        :class="{
            'item-bookmarked': checkIfVerseExistInBookmarkState(verse),
            'item-saved-in-bookmark': checkIfVerseExistInSavedBookmarks(verse),
            'saved-bookmark-selected': verse.b === selectedBookmark.b && verse.c === selectedBookmark.c && verse.v === selectedBookmark.v,
            'dark:border-gray-300 border-gray-700': clipNote && clipNote.color === 'default',
        }"
        :style="`${clipNote ? 'border: 2px solid ' + clipNote.color : ''}`"
        @click="clickVerse(verse)"
    >
        <div class="item-bookmarked-dot invisible opacity-0 absolute left-[5px] top-[5px]" title="Selected Verse">
            <div class="text-[var(--primaryColor)]">
                <NIcon>
                    <CircleFilled />
                </NIcon>
            </div>
        </div>
        <div class="read-chapter-verse-number">
            <span>{{ verse.v }}</span>
            <span class="item-saved-in-bookmark-mark">
                <n-tooltip trigger="hover" placement="bottom-start">
                    <template #trigger>
                        <NIcon>
                            <BookmarkFilled />
                        </NIcon>
                    </template>
                    <div>This Verse is <b> Bookmarked</b></div>
                </n-tooltip>
            </span>
        </div>
        <div v-if="verse.versions" class="w-[100%] max-w-1000px text-justify flex flex-col gap-15px">
            <div v-for="version in verse.versions" :key="version.version">
                <div class="leading-relaxed" :style="`font-size: ${fontSize}px; `">
                    <span class="verse-item-bible-version opacity-50 font-500 mr-7px">
                        <i> {{ getVersion(version.version) }}</i>
                    </span>
                    <span
                        class="verse-select-text cursor-text"
                        :data-key="`${version.version}_${verse.b}_${verse.c}_${verse.v}`"
                        :data-bible-version="version.version"
                        :data-book="verse.b"
                        :data-chapter="verse.c"
                        :data-verse="verse.v"
                        v-html="checkHighlight({ key: `${version.version}_${verse.b}_${verse.c}_${verse.v}`, orig: version.text })"
                        contenteditable="true"
                        spellcheck="false"
                        :onfocus="checkHere"
                        @click.stop.prevent
                    ></span>
                </div>
            </div>
        </div>
        <div class="verse-item-more-options absolute top-10px right-20px text-size-24px" @click.stop.prevent>
            <NTooltip trigger="hover" size="small" placement="left">
                <template #trigger>
                    <div class="verse-item-more-options-item dark:text-gray-300 text-gray-100 cursor-pointer" @click="saveToBookmark(verse)">
                        <NIcon>
                            <BookmarkAdd />
                        </NIcon>
                    </div>
                </template>
                <span>Add to Bookmark</span>
            </NTooltip>
            <NTooltip trigger="hover" size="small" placement="left">
                <template #trigger>
                    <SaveClipNote :verse="clipNote ? clipNote : { b: verse.b, c: verse.c, v: verse.v }" />
                </template>
                <span v-html="`${clipNote ? '<u><b>Edit</b></u> Clip Note' : '<b>Clip</b> A Note'}`"></span>
            </NTooltip>
        </div>
    </div>
    <VerseClipNote class="verse-clip-note" :clipNote="clipNote" :verse="clipNote ? clipNote : { b: verse.b, c: verse.c, v: verse.v }" :style="`font-size: ${fontSize - 2}px; `" />
</template>
<style lang="postcss">
.verse-item {
    @apply flex items-center justify-between w-[100%] gap-20px mt-20px cursor-default p-20px dark:bg-gray-100 bg-gray-800 dark:bg-opacity-0 bg-opacity-0 dark:hover:bg-opacity-3 hover:bg-opacity-5 border dark:border-gray-800 border-gray-50;

    .verse-select-text {
        .imOnlyOne {
            @apply rounded-md px-3px;
        }
    }

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
        @apply opacity-0 invisible duration-150 flex flex-col gap-10px;
    }

    .verse-item-more-options-item {
        @apply opacity-0 !hover:opacity-100 text-gray-900 dark:text-gray-100 dark:hover:text-[var(--primaryColor)] hover:text-[var(--primaryColor)] duration-200;
    }

    &:hover {
        .verse-item-more-options {
            @apply opacity-100 visible;

            .verse-item-more-options-item {
                @apply opacity-30;
            }
        }

        .read-chapter-verse-number {
            @apply opacity-100;
        }
    }
}

.verse-clip-note {
    ol,
    ul {
        padding: 5px 0px 5px 0px !important;
        margin: 5px 0px 5px 0px !important;
    }

    ol {
        display: block !important;
        list-style-type: decimal !important;
        padding-inline-start: 30px !important;
    }

    ul {
        display: block !important;
        list-style-type: disc !important;
        padding-inline-start: 30px !important;
    }

    pre {
        @apply text-size-18px dark:bg-dark-900 bg-gray-700 py-10px px-10px dark:text-gray-300 text-gray-100 rounded-md font-mono m-0;

        code {
            color: inherit;
            padding: 0;
            background: none;
        }
    }
}
</style>
