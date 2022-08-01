<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { NEmpty, NInput, NButton, NIcon, NSelect } from "naive-ui";
import { ipcRenderer } from "electron";
import { Search } from "@vicons/carbon";

const store = useStore();
const selectedHighlights = computed(() => store.state.marker.selectedHighlights);
const bibleState = computed(() => store.state.bible);
const verseBookmark = computed(() => store.state.verseBookmark);
const BibleVersion = computed(() => store.state.bible.bibleVersions);
const BibleBooks = computed(() => store.state.bible.bibleBooks);
const Highlights: any = computed(() => {
    if (Object.entries(searchedData.value).length) {
        return searchedData.value;
    }

    let data = Object.fromEntries(
        Object.entries(store.state.marker.highlights).filter((highlight: any) => highlight[1].bookNumber == searchBibleBook.value || searchBibleBook.value === "all")
    );

    return data;
});

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
                value: parseInt(item.b),
            });
        }
    });
    return newData;
});

const searchBibleBook = ref("all");
const valueRef = ref("");
const search = reactive({
    search: null,
    b: "all",
});

const getBibleVersion = (bible_key: string) => {
    let Version = BibleVersion.value.filter((version: any) => bible_key === version.table)[0];

    return Version ? Version.version : false;
};

const getBibleBook = (bookNumber: number) => {
    let Book = BibleBooks.value.filter((book: any) => bookNumber === book.b)[0];
    return Book ? Book.n : false;
};

const goToVerse = (verse: any) => {
    bibleState.value.bookSelected = verse.b;
    bibleState.value.chapterSelected = verse.c;
    verseBookmark.value.selectedBookmark = verse;
};

const isVerseVersionChecked = (version: string): boolean => {
    return bibleState.value.bibleVersionsSelected.includes(version);
};

const searchedData = ref({});
const getBibleVerseHighlight = (forSearch = false) => {
    ipcRenderer
        .invoke("getBibleVerseHighlight", {
            search: search.search,
            b: search.b,
        })
        .then((args: any) => {
            if (forSearch) {
                searchedData.value = args.data;
                return;
            }
            store.dispatch("setHighlights", args);
        });
};

const clickHighlight = (verse: any): void => {
    store.state.marker.selectedHighlights = verse.key;
    goToVerse({
        b: parseInt(verse.book),
        c: parseInt(verse.chapter),
        v: parseInt(verse.verse),
    });
};

onMounted(() => {
    getBibleVerseHighlight();
});
</script>
<template>
    <div class="mark-highlight-sidebar p-7px h-[100%] w-[100%] flex flex-col">
        <div class="text-size-[18px] mb-7px">
            <h3 class="font-700">{{ $t("marked_verses") }}</h3>
            <form class="mt-15px flex flex-col gap-10px" @submit.prevent="getBibleVerseHighlight(true)">
                <NInput v-model:value="search.search" :placeholder="$t('please_write_and_press_enter')" :clearable="true" />
                <div class="flex gap-10px">
                    <NSelect v-model:value="search.b" :options="options" />
                    <NButton type="primary" @click="getBibleVerseHighlight(true)">
                        <template #icon>
                            <NIcon>
                                <Search />
                            </NIcon>
                        </template>
                    </NButton>
                </div>
            </form>
        </div>
        <div v-if="Highlights" class="flex flex-col gap-10px h-[100%] overflow-y-auto overflowing-div">
            <template v-for="highlight in Highlights" :key="highlight.key">
                <div
                    v-if="highlight.key && isVerseVersionChecked(highlight.version)"
                    class="mark-highlight-sidebar-item rounded-md"
                    :class="{ 'mark-highlight-sidebar-item-active': selectedHighlights === highlight.key }"
                    @click="clickHighlight(highlight)"
                >
                    <div>
                        <span class="text-size-18px font-700"> {{ getBibleBook(parseInt(highlight.book)) }} {{ highlight.chapter }}:{{ highlight.verse }} </span>
                        <span class="text-size-16px mb-10px whitespace-nowrap"> - {{ getBibleVersion(highlight.version) }}</span>
                    </div>

                    <span v-html="highlight.content"></span>
                </div>
            </template>
        </div>
        <div v-else class="mt-30px">
            <NEmpty description="Add Highlights" />
        </div>
    </div>
</template>

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
