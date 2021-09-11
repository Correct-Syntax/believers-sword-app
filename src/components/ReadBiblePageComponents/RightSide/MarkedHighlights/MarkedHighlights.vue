<template>
    <div class="mark-highlight-sidebar p-7px h-[100%] w-[100%] overflow-y-auto overflowing-div">
        <div class="text-size-[18px] mb-7px">
            <h3>Your Highlights:</h3>
        </div>
        <div class="flex flex-col gap-10px">
            <template v-for="highlight in Highlights.highlights" :key="highlight.key">
                <div
                    v-if="highlight.key"
                    class="mark-highlight-sidebar-item"
                    :class="{ 'mark-highlight-sidebar-item-active': Highlights.selectedHighlights === highlight.key }"
                    @click="clickHighlight(highlight)"
                >
                    <span v-html="highlight.content"></span>
                </div>
            </template>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
    setup() {
        const store = useStore();
        const Highlights = computed(() => store.state.marker);
        const bibleState = computed(() => store.state.bible);
        const verseBookmark = computed(() => store.state.verseBookmark);

        const goToVerse = (verse: any) => {
            bibleState.value.bookSelected = verse.b;
            bibleState.value.chapterSelected = verse.c;
            verseBookmark.value.selectedBookmark = verse;
        };

        return {
            Highlights,
            clickHighlight: (verse: any): void => {
                Highlights.value.selectedHighlights = verse.key;
                goToVerse({
                    b:  parseInt(verse.bookNumber),
                    c:  parseInt(verse.chapterNumber),
                    v:  parseInt(verse.verseNumber)
                });
            },
        };
    },
});
</script>
<style lang="postcss">
.mark-highlight-sidebar {
    .mark-highlight-sidebar-item {
        @apply text-size-14px cursor-pointer dark:bg-gray-200 dark:bg-opacity-0 hover:dark:bg-opacity-5 p-10px leading-loose;

        &.mark-highlight-sidebar-item-active {
            @apply border-l-[5px] border-[var(--primaryColor)]
        }

        .HasHighlightSpan {
            @apply text-size-20px px-4px rounded-md;
        }
    }
}
</style>
