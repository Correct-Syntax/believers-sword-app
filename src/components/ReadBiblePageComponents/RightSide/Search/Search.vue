<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { NInput, NSelect, NButton, NPagination, NIcon } from "naive-ui";
import { useStore } from "vuex";
import { ipcRenderer } from "electron";
import { Search } from "@vicons/carbon";

const store = useStore();
const searchValue = ref("");
const searchBibleVersion = ref("t_kjv");
const searchBibleBook = ref("all");
const searchBiblePage = ref(1);
const searchResultLimit = ref(15);
const searchResults: any = ref([]);
const searchResultCount = ref(0);
const selectedResult: any = ref(null);

const bibleState = computed(() => store.state.bible);
const verseBookmark = computed(() => store.state.verseBookmark);

const goToVerse = (verse: any) => {
    bibleState.value.bookSelected = verse.b;
    bibleState.value.chapterSelected = verse.c;
    verseBookmark.value.selectedBookmark = verse;
    selectedResult.value = verse;
};

const bibleVersionsOptions = computed(() => {
    let bibleVersions = store.state.bible.bibleVersions;
    let newData: any = [];
    bibleVersions.forEach((item: any) =>
        newData.push({
            label: `${item.abbreviation} - ${item.version}`,
            value: item.table,
        })
    );
    return newData;
});

const getBookNameByNumber = (BookNumber: number) => {
    let bookName = store.state.bible.bibleBooks.filter((item: any) => item.b === BookNumber)?.[0]?.n;
    return bookName;
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

const clickSubmitSearch = (reset = false) => {
    if (reset) {
        searchBiblePage.value = 1;
        searchResultCount.value = 0;
    }
    let params = {
        q: searchValue.value,
        bibleVersion: searchBibleVersion.value,
        bibleBook: searchBibleBook.value,
        page: searchBiblePage.value,
        limit: searchResultLimit.value,
    };
    ipcRenderer.invoke("searchBibleSubmitButton", params).then((payload: any) => {
        let result = payload.result;
        var searchMask = searchValue.value;
        var regEx = new RegExp(searchMask, "ig");
        var replaceMask = `<span style="background-color: yellow; color: black; font-weight: 900 !important;">${searchValue.value}</span>`;

        for (let [key, item] of result.entries()) {
            result[key].t = item.t.replace(regEx, replaceMask);
        }
        searchResults.value = result;
        searchResultCount.value = payload.count;
        let searchResultView = document.getElementById("search-result-view");
        if (searchResultView) searchResultView.scrollTop = 0;
    });
};

watch(searchBiblePage, () => {
    clickSubmitSearch();
});
</script>
<template>
    <div class="h-[100%] p-7px flex flex-col gap-7px">
        <div class="flex flex-col gap-7px">
            <NInput v-model:value="searchValue" type="text" :placeholder="$t('type_to_search')" @keyup.enter="clickSubmitSearch(true)" />
            <NSelect v-model:value="searchBibleVersion" :options="bibleVersionsOptions" :placeholder="$t('select_bible_version')" />
            <div class="flex gap-5px">
                <NSelect v-model:value="searchBibleBook" :options="bibleBookOptions" :placeholder="$t('select_bible_book')" />
                <NButton type="primary" @click="clickSubmitSearch(true)">
                    <div class="flex items-center gap-[10px]">
                        <NIcon>
                            <Search />
                        </NIcon>
                    </div>
                </NButton>
            </div>
        </div>
        <div id="search-result-view" class="h-[100%] overflow-y-auto overflowing-div flex flex-col gap-7px">
            <div
                class="cursor-pointer opacity-70 hover:opacity-100 p-7px"
                v-for="result in searchResults"
                :key="result.id"
                :class="{
                    'selected-view-result': selectedResult != null && selectedResult.b === result.b && selectedResult.c === result.c && selectedResult.v === result.v,
                }"
                @click="goToVerse(result)"
            >
                <div>
                    <span class="font-700 italic mr-5px">{{ getBookNameByNumber(result.b) }} {{ result.c }}:{{ result.v }}</span>
                    <span v-html="result.t"></span>
                </div>
            </div>
        </div>
        <div v-show="Math.floor(searchResultCount / searchResultLimit) > 1" class="w-[100%] flex flex-col items-end gap-7px">
            <div>{{ $t("total_verse_result") }}: {{ searchResultCount }}</div>
            <NPagination v-model:page="searchBiblePage" :page-count="Math.floor(searchResultCount / searchResultLimit)" :page-slot="5" />
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.selected-view-result {
    @apply border-l-[5px] border-b-[var(--primaryColor)];
    opacity: 1 !important;
}

.highlight-search {
    @apply !bg-yellow-300;
}
</style>
