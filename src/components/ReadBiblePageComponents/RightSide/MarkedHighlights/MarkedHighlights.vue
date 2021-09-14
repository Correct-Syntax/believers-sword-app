<template>
    <div class="mark-highlight-sidebar p-7px h-[100%] w-[100%] overflow-auto overflowing-div">
        <div class="text-size-[18px] mb-7px">
            <h3>Your Highlights:</h3>
        </div>
        <div v-if="Highlights.highlights" class="flex flex-col gap-10px">
            <template v-for="highlight in Highlights.highlights" :key="highlight.key">
                <div
                    v-if="highlight.key && isVerseVersionChecked(highlight.bibleVersion)"
                    class="mark-highlight-sidebar-item"
                    :class="{ 'mark-highlight-sidebar-item-active': Highlights.selectedHighlights === highlight.key }"
                    @click="clickHighlight(highlight)"
                >
                    <div class="text-size-18px font-700">{{ getBibleVersion(highlight.bibleVersion) }}</div>
                    <div class="text-size-16px mb-10px">{{ getBibleBook(parseInt(highlight.bookNumber)) }} {{ highlight.chapterNumber }}:{{ highlight.verseNumber }}</div>
                    <span v-html="highlight.content"></span>
                </div>
            </template>
        </div>
        <div v-else class="mt-30px">
            <NEmpty description="Add Highlights" />
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, watch } from "vue";
import { useStore } from "vuex";
import { NEmpty } from "naive-ui";

export default defineComponent({
    components: { NEmpty },
    setup() {
        const store = useStore();
        const Highlights = computed(() => store.state.marker);
        const bibleState = computed(() => store.state.bible);
        const verseBookmark = computed(() => store.state.verseBookmark);
        const BibleVersion = computed(() => store.state.bible.bibleVersions);
        const BibleBooks = computed(() => store.state.bible.bibleBooks);

        const getBibleVersion = (bible_key: string) => {
            let Version = BibleVersion.value.filter((version: any) => bible_key === version.table)[0];

            return Version ? Version.version : false;
        };

        const getBibleBook = (bookNumber: number) => {
            let Book = BibleBooks.value.filter((book: any) => bookNumber === book.b)[0];
            return Book ? Book.n : false;
        };

        watch(Highlights, (e) => {
            console.log(e);
        });

        const goToVerse = (verse: any) => {
            bibleState.value.bookSelected = verse.b;
            bibleState.value.chapterSelected = verse.c;
            verseBookmark.value.selectedBookmark = verse;
        };

        const isVerseVersionChecked = (version: string): boolean => {
            return bibleState.value.bibleVersionsSelected.includes(version);
        };

        return {
            getBibleBook,
            getBibleVersion,
            Highlights,
            isVerseVersionChecked,
            clickHighlight: (verse: any): void => {
                Highlights.value.selectedHighlights = verse.key;
                goToVerse({
                    b: parseInt(verse.bookNumber),
                    c: parseInt(verse.chapterNumber),
                    v: parseInt(verse.verseNumber),
                });
            },
        };
    },
});
</script>
<style lang="postcss">
.mark-highlight-sidebar {
    .mark-highlight-sidebar-item {
        @apply text-size-14px cursor-pointer dark:bg-gray-200 dark:bg-opacity-0 hover:dark:bg-opacity-5 p-10px;

        span {
            @apply leading-normal;
        }

        &.mark-highlight-sidebar-item-active {
            @apply border-l-[5px] border-[var(--primaryColor)];
        }

        .HasHighlightSpan {
            @apply text-size-16px px-4px rounded-md;
        }
    }
}
</style>
