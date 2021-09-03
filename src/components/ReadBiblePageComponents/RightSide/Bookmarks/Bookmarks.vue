<template>
    <div class="px-7px h-[100%] w-[100%] overflow-y-auto overflowing-div select-none">
        <div class="flex flex-col gap-10px">
            <div class="right-side-bookmark-saved-items" v-for="bookmark in savedBookmarks" :key="bookmark.b_text + bookmark.b + bookmark.c + bookmark.v" @click="goToVerse(bookmark)">
                <div>{{ bookmark.b_text }} {{ bookmark.c }}:{{ bookmark.v }}</div>
                <div class="flex gap-20px cursor-pointer text-size-20px">
                    <div class="opacity-50 hover:opacity-100">
                        <i class="bx bx-share-alt"></i>
                    </div>
                    <div class="opacity-50 hover:opacity-100 dark:text-red-400 text-red-600">
                        <i class="bx bx-trash"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
    setup() {
        const store = useStore();
        const savedBookmarks = computed(() => store.state.verseBookmark.savedBookmarks);
        const bibleState = computed(() => store.state.bible)

        const goToVerse = (verse: any) => {
            bibleState.value.bookSelected = verse.b,
            bibleState.value.chapterSelected = verse.c
        }

        return {
            savedBookmarks,
            goToVerse
        };
    },
});
</script>
<style lang="scss">
.right-side-bookmark-saved-items {
    @apply flex flex-row gap-10px justify-between px-20px text-size-17px py-15px bg-gray-800 bg-opacity-30;
    &:hover {
        @apply bg-gray-100 bg-opacity-5 cursor-pointer;
    }
}
</style>