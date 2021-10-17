<template>
    <div id="view-chapter-component" class="h-[100%] w-[100%]">
        <div id="view-chapter-component-wrapper" class="h-[100%] w-[100%] flex">
            <div id="view-chapter-left-side-bar" class="h-[100%] w-[100%] relative">
                <div class="h-[100%] w-[100%] relative">
                    <div class="h-[var(--view-chapter-top-width)] shadow-md">
                        <TopOptionsBar />
                    </div>
                    <div id="view-chapter-verse" class="view-chapter-verse overflowing-div scroll-bar-md" @scroll="scrollViewChapterVerse">
                        <div class="view-chapter-verse-wrapper w-[100%]">
                            <div class="absolute left-10px top-[50%] text-size-30px z-50">
                                <div class="view-chapter-arrow-pointer" @click="clickPointer('previous')">
                                    <i class="bx bx-left-arrow"></i>
                                </div>
                            </div>
                            <div class="h-[100%] flex justify-center relative">
                                <div class="flex justify-center">
                                    <VersesRender :viewBookChapter="bibleStore.viewBookChapter" :fontSize="fontSize" :clipNotes="clipNotesInChapter" />
                                </div>
                            </div>
                            <div class="absolute right-30px top-[50%] text-size-30px z-50">
                                <div class="view-chapter-arrow-pointer" @click="clickPointer('next')">
                                    <i class="bx bx-right-arrow"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, watch } from "vue";
import { useStore } from "vuex";
import session from "@/service/session/session";
import VersesRender from "@/components/ReadBiblePageComponents/ViewChapter/Verses/Verses.vue";
import TopOptionsBar from "@/components/ReadBiblePageComponents/ViewChapter/TopOptions/TopOptions.vue";
import { ipcRenderer } from "electron";

export default defineComponent({
    components: { VersesRender, TopOptionsBar },
    setup() {
        const store = useStore();
        const bibleStore = computed(() => store.state.bible);
        const fontSize = computed(() => store.state.bible.viewChapterVersesFontSize);
        const selectedBookmark = computed(() => store.state.verseBookmark.selectedBookmark);
        const clipNotesInChapter = computed(() => store.state.clipNotes.clipNotesInChapter);
        const toggledClipNote = computed(() => store.state.clipNotes.toggledClipNote);

        const getVersion = (table: string) => {
            let version = bibleStore.value.bibleVersions.filter((item: any) => item.table === table);
            return version ? version[0]?.abbreviation : "NONE";
        };

        const getClipNotesInChapter = (book: number | string, chapter: number | string) => {
            ipcRenderer.invoke("getClipNotes", { b: book, c: chapter }).then((data: any) => {
                store.state.clipNotes.clipNotesInChapter = data.data;
            });
        };

        watch(toggledClipNote, (newValue, oldValue) => {
            if (newValue.b != oldValue.b || newValue.c != oldValue.c) {
                getClipNotesInChapter(bibleStore.value.bookSelected, bibleStore.value.chapterSelected);
            }
        });

        watch(selectedBookmark, async () => {
            let viewChapterVerseElement = document.getElementById("view-chapter-verse");
            setTimeout(() => {
                let el = document.getElementsByClassName("saved-bookmark-selected")[0];
                if (el instanceof HTMLElement) {
                    if (viewChapterVerseElement) viewChapterVerseElement.scrollTop = el.offsetTop ? el.offsetTop : 0;
                }
            }, 200);
        });

        onMounted(async () => {
            let viewChapterVerseElement = document.getElementById("view-chapter-verse");
            setTimeout(() => {
                const scrollTop = session.get("viewChapterVerseScrollTop");
                if (viewChapterVerseElement) viewChapterVerseElement.scrollTop = scrollTop ? scrollTop : 0;
            }, 300);
            getClipNotesInChapter(bibleStore.value.bookSelected, bibleStore.value.chapterSelected);
        });

        return {
            clipNotesInChapter,
            bibleStore,
            async clickPointer(action: string) {
                let chapterCount = action === "next" ? bibleStore.value.chapterSelected + 1 : bibleStore.value.chapterSelected - 1;
                bibleStore.value.chapterSelected =
                    chapterCount < 1 ? 1 : chapterCount > bibleStore.value.bookSelectedChapterCount ? bibleStore.value.bookSelectedChapterCount : chapterCount;
                await store.dispatch("getBookInChapter", { bible: bibleStore.value.bible, book: bibleStore.value.bookSelected, chapter: bibleStore.value.chapterSelected });
            },
            scrollViewChapterVerse() {
                let viewScrollTop = document.getElementById("view-chapter-verse")?.scrollTop;
                session.set("viewChapterVerseScrollTop", viewScrollTop);
            },
            getVersion,
            fontSize,
            popSelectOptions: [
                {
                    label: "<b>sdf</b>Go Let It Out",
                    value: "Go Let It Out"
                },
                {
                    label: "Who Feels Love?",
                    value: "Who Feels Love?"
                },
                {
                    label: "Sunday Morning Call",
                    value: "Sunday Morning Call",
                    disabled: true
                },
                {
                    label: "Roll It Over",
                    value: "Roll It Over"
                }
            ]
        };
    }
});
</script>
<style lang="postcss">
#view-chapter-component {
    --view-chapter-top-width: 35px;
}

#view-chapter-component-wrapper {
    --view-chapter-left-width: 1000px;
    --minus-left-width: 33px;
}

.view-chapter-arrow-pointer {
    @apply opacity-30 hover:opacity-95 cursor-pointer p-10px duration-150;
}

.view-chapter-verse {
    @apply overflow-y-auto;
    height: calc(100% - var(--view-chapter-top-width));
}
</style>
