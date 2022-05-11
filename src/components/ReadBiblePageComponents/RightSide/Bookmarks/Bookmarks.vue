<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { NPopconfirm, NEmpty, NAutoComplete } from "naive-ui";
import { ipcRenderer } from "electron";

const store = useStore();
const bibleState = computed(() => store.state.bible);
const verseBookmark = computed(() => store.state.verseBookmark);
const selectedBookmark = computed(() => store.state.verseBookmark.selectedBookmark);
const BibleBookSelected = ref("all");
const searchBibleBook = ref("all");

const savedBookmarks: any = computed(() => {
    return Object.fromEntries(
        Object.entries(store.state.verseBookmark.savedBookmarks).filter((bookmark: any) => bookmark[1].b == searchBibleBook.value || searchBibleBook.value === "all")
    );
});

const getSavedBookmarks = () => {
    ipcRenderer.invoke("getVersesSavedBookmarks").then((bookmarks: any) => {
        store.dispatch("getVersesInBookmarkResult", bookmarks);
    });
};

watch(BibleBookSelected, () => {
    getSavedBookmarks();
});

onMounted(() => {
    getSavedBookmarks();
});

const bibleBookOptions = computed(() => {
    let bibleBooks = store.state.bible.bibleBooks;
    let newData: any = [
        {
            label: "All - Select Book",
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

const valueRef = ref("");

const getShowOptions = () => true;
function goToVerse(verse: any) {
    bibleState.value.bookSelected = verse.b;
    bibleState.value.chapterSelected = verse.c;
    verseBookmark.value.selectedBookmark = {
        b: verse.b,
        c: verse.c,
        v: verse.v,
    };
}
const removeBookmark = (verse: any) => {
    if (verse.b && verse.c && verse.v)
        ipcRenderer
            .invoke("deleteVerseInSavedBookmarks", {
                b: verse.b,
                c: verse.c,
                v: verse.v,
            })
            .then((data: any) => {
                if (data) {
                    let savedBookmarks = store.state.verseBookmark.savedBookmarks;
                    delete savedBookmarks[`${verse.b}_${verse.c}_${verse.v}`];
                    store.state.verseBookmark.savedBookmarks = savedBookmarks;
                }
            });
};
const options = computed(() => {
    let newData: any = [
        {
            label: "All - Select Book",
            value: "all",
        },
    ];
    store.state.bible.bibleBooks.forEach((item: any) => {
        if (item.n.toLowerCase().includes(valueRef.value.toLowerCase()) || valueRef.value === " " || valueRef.value === "" || valueRef.value === null) {
            newData.push({
                label: item.n,
                value: item.b,
            });
        }
    });
    return newData;
});
const selectOption = (e: string | number) => {
    searchBibleBook.value = e.toString();
};
</script>

<template>
    <div class="flex flex-col p-7px h-[100%] w-[100%] select-none">
        <div class="text-size-[18px] mb-7px">
            <small class="font-800 text-center">Your Bookmarks</small>
            <div class="mt-7px">
                <NAutoComplete :options="options" v-model:value="valueRef" placeholder="Write Book Name To Filter" :on-select="selectOption" :get-show="getShowOptions" />
            </div>
        </div>
        <div v-if="Object.keys(savedBookmarks).length > 0" class="bookmarks-view-wrapper overflow-y-auto overflowing-div w-[100%]">
            <template v-for="bookmark in savedBookmarks" :key="bookmark.b_text + bookmark.b + bookmark.c + bookmark.v">
                <div
                    class="right-side-bookmark-saved-items"
                    :class="{
                        'right-side-bookmark-selected': bookmark.b === selectedBookmark.b && bookmark.c === selectedBookmark.c && bookmark.v === selectedBookmark.v,
                    }"
                    @click="goToVerse(bookmark)"
                >
                    <div class="w-[100%] px-5px py-10px text-size-17px">{{ bookmark.b_text }} {{ bookmark.c }}:{{ bookmark.v }}</div>
                    <div class="flex gap-10px cursor-pointer text-size-18px px-10px">
                        <div class="opacity-50 hover:opacity-100 hidden" @click.stop.prevent>
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
            </template>
        </div>
        <div v-show="!Object.keys(savedBookmarks).length" class="mt-30px">
            <NEmpty :description="bibleBookOptions != 'all' ? `No Bookmarks in this Book` : `Add Bookmarks Here`" />
        </div>
    </div>
</template>
<style lang="scss">
.bookmarks-view-wrapper {
    @apply flex flex-wrap gap-0px justify-center;
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
