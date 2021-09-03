<template>
    <div class="px-7px h-[100%] w-[100%] overflow-y-auto overflowing-div select-none">
        <div class="flex flex-col gap-10px">
            <div v-if="savedBookmarks.length > 0">
                <div
                    v-for="bookmark in savedBookmarks"
                    :key="bookmark.b_text + bookmark.b + bookmark.c + bookmark.v"
                    class="right-side-bookmark-saved-items"
                    :class="{ 'right-side-bookmark-selected': bookmark.b === selectedBookmark.b && bookmark.c === selectedBookmark.c && bookmark.v === selectedBookmark.v }"
                    @click="goToVerse(bookmark)"
                >
                    <div>{{ bookmark.b_text }} {{ bookmark.c }}:{{ bookmark.v }}</div>
                    <div class="flex gap-20px cursor-pointer text-size-20px">
                        <div class="opacity-50 hover:opacity-100">
                            <i class="bx bx-share-alt"></i>
                        </div>
                        <NPopconfirm :show-icon="false" placement="top-start" :on-positive-click="removeBookmark">
                            <template #activator>
                                <div class="opacity-50 hover:opacity-100 dark:text-red-400 text-red-600">
                                    <i class="bx bx-trash"></i>
                                </div>
                            </template>
                            As is
                        </NPopconfirm>
                    </div>
                </div>
            </div>
            <div v-else class="mt-30px">
                <n-empty description="Add Bookmarks Here" />
            </div>
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
<style lang="scss">
.right-side-bookmark-saved-items {
    @apply flex flex-row gap-10px justify-between px-20px text-size-17px py-15px bg-gray-800 bg-opacity-30 border dark:border-gray-300 border-gray-700 dark:border-opacity-0 border-opacity-0;

    &.right-side-bookmark-selected {
        @apply dark:border-opacity-100 border-opacity-100;
    }

    &:hover {
        @apply bg-gray-100 bg-opacity-5 cursor-pointer;
    }
}
</style>