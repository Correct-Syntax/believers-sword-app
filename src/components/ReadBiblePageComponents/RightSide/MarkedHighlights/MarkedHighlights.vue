<template>
    <div class="mark-highlight-sidebar p-7px h-[100%] w-[100%] flex flex-col">
        <div class="text-size-[18px] mb-7px">
            <h3>Your Highlights:</h3>
            <div class="mt-7px">
                <NAutoComplete :options="options" v-model:value="value" placeholder="Write Book Name To Filter" :on-select="selectOption" :get-show="getShowOptions" />
            </div>
        </div>
        <div v-if="Highlights" class="flex flex-col gap-10px h-[100%] overflow-y-auto overflowing-div">
            <template v-for="highlight in Highlights" :key="highlight.key">
                <div
                    v-if="highlight.key && isVerseVersionChecked(highlight.bibleVersion)"
                    class="mark-highlight-sidebar-item"
                    :class="{ 'mark-highlight-sidebar-item-active': selectedHighlights === highlight.key }"
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
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { NEmpty, NAutoComplete } from "naive-ui";
import { ipcRenderer } from "electron";

export default defineComponent({
    components: { NEmpty, NAutoComplete },
    setup() {
        const store = useStore();

        const selectedHighlights = computed(() => store.state.marker.selectedHighlights);
        const bibleState = computed(() => store.state.bible);
        const verseBookmark = computed(() => store.state.verseBookmark);
        const BibleVersion = computed(() => store.state.bible.bibleVersions);
        const BibleBooks = computed(() => store.state.bible.bibleBooks);
        const searchBibleBook = ref("all");

        const Highlights = computed(() => {
            return Object.fromEntries(
                Object.entries(store.state.marker.highlights).filter((highlight: any) => highlight[1].bookNumber == searchBibleBook.value || searchBibleBook.value === "all")
            );
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

        const valueRef = ref("");
        const bibleBookOptions = computed(() => {
            let bibleBooks = store.state.bible.bibleBooks;
            let newData: any = [
                {
                    label: "All - Select Book",
                    value: "all"
                }
            ];
            bibleBooks.forEach((item: any) =>
                newData.push({
                    label: item.n,
                    value: item.b
                })
            );
            return newData;
        });

        onMounted(() => {
            ipcRenderer.invoke("getBibleVerseHighlight").then((args: any) => {
                const obj = store.state.marker.highlights;
                if (obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype) store.dispatch("setHighlights", args);
            });
        });

        return {
            getShowOptions: () => true,
            value: valueRef,
            selectedHighlights,
            bibleBookOptions,
            searchBibleBook,
            getBibleBook,
            getBibleVersion,
            Highlights,
            isVerseVersionChecked,
            clickHighlight: (verse: any): void => {
                store.state.marker.selectedHighlights = verse.key;
                goToVerse({
                    b: parseInt(verse.bookNumber),
                    c: parseInt(verse.chapterNumber),
                    v: parseInt(verse.verseNumber)
                });
            },
            options: computed(() => {
                let newData: any = [
                    {
                        label: "All - Select Book",
                        value: "all"
                    }
                ];
                store.state.bible.bibleBooks.forEach((item: any) => {
                    if (item.n.toLowerCase().includes(valueRef.value.toLowerCase()) || valueRef.value === " " || valueRef.value === "" || valueRef.value === null) {
                        newData.push({
                            label: item.n,
                            value: item.b
                        });
                    }
                });
                return newData;
            }),
            selectOption: (e: any) => {
                searchBibleBook.value = e;
            }
        };
    }
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
