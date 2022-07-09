<script lang="ts" setup>
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import session from "@/service/session/session";
import VersesRender from "@/components/ReadBiblePageComponents/ViewChapter/Verses/Verses.vue";
import TopOptionsBar from "@/components/ReadBiblePageComponents/ViewChapter/TopOptions/TopOptions.vue";
import { ipcRenderer } from "electron";
import { NIcon } from "naive-ui";
import { ArrowLeft, ArrowRight } from "@vicons/carbon";

const store = useStore();
const bibleStore = computed(() => store.state.bible);
const fontSize = computed(() => store.state.bible.viewChapterVersesFontSize);
const selectedBookmark = computed(() => store.state.verseBookmark.selectedBookmark);
const clipNotesInChapter = computed(() => store.state.clipNotes.clipNotesInChapter);
const toggledClipNote = computed(() => store.state.clipNotes.toggledClipNote);

const getClipNotesInChapter = (book: number | string, chapter: number | string) => {
    ipcRenderer.invoke("getClipNotes", { b: book, c: chapter }).then((data: any) => (store.state.clipNotes.clipNotesInChapter = data.data));
};

watch(toggledClipNote, (newValue, oldValue) => {
    if (newValue.b != oldValue.b || newValue.c != oldValue.c) getClipNotesInChapter(bibleStore.value.bookSelected, bibleStore.value.chapterSelected);
});

watch(selectedBookmark, async () => {
    let viewChapterVerseElement = document.getElementById("view-chapter-verse");
    setTimeout(() => {
        let el = document.getElementsByClassName("saved-bookmark-selected")[0];
        if (el instanceof HTMLElement) if (viewChapterVerseElement) viewChapterVerseElement.scrollTop = el.offsetTop ? el.offsetTop - 30 : 0;
    }, 100);
});

function clickPointer(action: string) {
    let chapterCount = action === "next" ? bibleStore.value.chapterSelected + 1 : bibleStore.value.chapterSelected - 1;
    bibleStore.value.chapterSelected = chapterCount < 1 ? 1 : chapterCount > bibleStore.value.bookSelectedChapterCount ? bibleStore.value.bookSelectedChapterCount : chapterCount;
    store.dispatch("getBookInChapter", { bible: bibleStore.value.bible, book: bibleStore.value.bookSelected, chapter: bibleStore.value.chapterSelected });
}
function scrollViewChapterVerse() {
    session.set("viewChapterVerseScrollTop", document.getElementById("view-chapter-verse")?.scrollTop);
}

onMounted(async () => {
    let viewChapterVerseElement = document.getElementById("view-chapter-verse");
    setTimeout(() => {
        const scrollTop = session.get("viewChapterVerseScrollTop");
        if (viewChapterVerseElement) viewChapterVerseElement.scrollTop = scrollTop ? scrollTop : 0;
    }, 300);
    getClipNotesInChapter(bibleStore.value.bookSelected, bibleStore.value.chapterSelected);
});
</script>

<template>
    <div class="h-[100%] flex flex-col w-[100%] relative">
        <div class="h-[var(--view-chapter-top-width)]">
            <TopOptionsBar />
        </div>
        <div id="view-chapter-verse" class="overflow-y-auto h-[100%] w-[100%] overflowing-div scroll-bar-md" @scroll="scrollViewChapterVerse">
            <div class="absolute left-10px top-[50%] text-size-30px z-50">
                <div class="view-chapter-arrow-pointer" @click="clickPointer('previous')">
                    <NIcon>
                        <ArrowLeft />
                    </NIcon>
                </div>
            </div>
            <div class="h-[100%] flex justify-center relative">
                <div class="flex justify-center">
                    <VersesRender :viewBookChapter="bibleStore.viewBookChapter" :fontSize="fontSize" :clipNotes="clipNotesInChapter" />
                </div>
            </div>
            <div class="absolute right-30px top-[50%] text-size-30px z-50">
                <div class="view-chapter-arrow-pointer" @click="clickPointer('next')">
                    <NIcon>
                        <ArrowRight />
                    </NIcon>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="postcss">
.view-chapter-arrow-pointer {
    @apply opacity-30 hover:opacity-95 hover:text-[var(--primaryColor)] cursor-pointer duration-150;
}
</style>
