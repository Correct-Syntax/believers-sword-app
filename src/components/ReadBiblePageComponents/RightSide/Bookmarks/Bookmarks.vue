<template>
    <div class="flex flex-col gap-10px p-7px h-[100%] w-[100%] overflow-y-auto overflowing-div select-none">
        <div class="text-size-[18px] mb-7px">
            <h3>Your Bookmarks:</h3>
        </div>
        <div v-if="savedBookmarks.length > 0" class="bookmarks-view-wrapper">
            <div
                v-for="bookmark in savedBookmarks"
                :key="bookmark.b_text + bookmark.b + bookmark.c + bookmark.v"
                class="right-side-bookmark-saved-items "
                :class="{ 'right-side-bookmark-selected': bookmark.b === selectedBookmark.b && bookmark.c === selectedBookmark.c && bookmark.v === selectedBookmark.v }"
            >
                <div class="w-[100%] px-5px py-5px" @click="goToVerse(bookmark)">{{ bookmark.b_text }} {{ bookmark.c }}:{{ bookmark.v }}</div>
                <div class="flex gap-10px cursor-pointer text-size-18px px-10px">
                    <div class="opacity-50 hover:opacity-100">
                        <i class="bx bx-share-alt"></i>
                    </div>
                    <NPopconfirm :show-icon="false" placement="top-start" :on-positive-click="removeBookmark">
                        <template #activator>
                            <div class="opacity-50 hover:opacity-100 dark:text-red-400 text-red-600">
                                <i class="bx bx-trash"></i>
                            </div>
                        </template>
                        Delete Bookmark?
                    </NPopconfirm>
                </div>
            </div>
        </div>
        <div v-else class="mt-30px">
            <n-empty description="Add Bookmarks Here" />
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { NPopconfirm, NEmpty } from "naive-ui";
import { ipcRenderer } from "electron";

export default defineComponent({
    components: { NPopconfirm, NEmpty },
    setup() {
        const store = useStore();
        const savedBookmarks = computed(() => store.state.verseBookmark.savedBookmarks);
        const bibleState = computed(() => store.state.bible);
        const verseBookmark = computed(() => store.state.verseBookmark);
        const selectedBookmark = computed(() => store.state.verseBookmark.selectedBookmark);

        const goToVerse = (verse: any) => {
            bibleState.value.bookSelected = verse.b;
            bibleState.value.chapterSelected = verse.c;
            verseBookmark.value.selectedBookmark = verse;
        };

        return {
            savedBookmarks,
            goToVerse,
            selectedBookmark,
            removeBookmark() {
                ipcRenderer.send("deleteVerseInSavedBookmarks", { b: selectedBookmark.value.b, c: selectedBookmark.value.c, v: selectedBookmark.value.v });
                store.state.verseBookmark.selectedBookmark = {};
            },
        };
    },
});
</script>
<style lang="postcss">
.bookmarks-view-wrapper {
    @apply flex flex-wrap gap-10px;

    & > * {
        flex: 1 0 200px;
        min-width: 200px;
    }
}
.right-side-bookmark-saved-items {
    @apply flex items-center flex-row gap-10px justify-between text-size-15px border  border-opacity-0 border-light-50 duration-200;

    &.right-side-bookmark-selected {
        @apply border-[var(--primaryColor)] rounded-md;
    }

    &:hover {
        @apply dark:bg-gray-100 dark:bg-opacity-5 bg-gray-700 bg-opacity-5 cursor-pointer;
    }
}
</style>