<template>
    <div id="view-chapter-component" class="h-[100%] w-[100%]">
        <div class="h-[100%] w-[100%] flex">
            <div class="h-[100%] w-[100%] min-w-600px relative">
                <div class="h-[var(--view-chapter-top-width)]">
                    <p>sdfsdf</p>
                </div>
                <div id="view-chapter-verse" class="view-chapter-verse overflowing-div" @scroll="scrollViewChapterVerse">
                    <div class="view-chapter-verse-wrapper w-[100%]">
                        <div class="absolute left-40px top-[50%] text-size-30px z-50">
                            <div class="view-chapter-arrow-pointer" @click="clickPointer('previous')">
                                <i class="bx bx-left-arrow"></i>
                            </div>
                        </div>
                        <div class="h-[100%] flex justify-center relative">
                            <div class="flex justify-center">
                                <div class="m-20px w-[100%]">
                                    <div v-for="verse in bibleStore.viewBookChapter" :key="verse.v" class="verse-item">
                                        <div class="w-[100%] max-w-[80px] flex justify-center items-center text-size-30px font-700">
                                            {{ verse.v }}
                                        </div>
                                        <div class="max-w-500px text-justify">
                                            {{ verse.t }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="absolute right-40px top-[50%] text-size-30px z-50">
                            <div class="view-chapter-arrow-pointer" @click="clickPointer('next')">
                                <i class="bx bx-right-arrow"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="h-[100%] w-[100%] dark:bg-black dark:bg-opacity-20 bg-gray-300 max-w-400px">This will be the side bar</div>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import session from "@/helper/session";

export default defineComponent({
    setup() {
        const store = useStore();
        const bibleStore = computed(() => store.state.bible);

        onMounted(() => {
            let viewChapterVerseElement = document.getElementById("view-chapter-verse");
            setTimeout(() => {
                const scrollTop = session.get("viewChapterVerseScrollTop");
                if (viewChapterVerseElement) viewChapterVerseElement.scrollTop = scrollTop ? scrollTop : 0;
            }, 100);
        });

        return {
            bibleStore,
            async clickPointer(action: string) {
                let chapterCount =action === "next" ? bibleStore.value.chapterSelected + 1 : bibleStore.value.chapterSelected - 1
                bibleStore.value.chapterSelected = chapterCount < 1 ? 1 : chapterCount > bibleStore.value.bookSelectedChapterCount ? bibleStore.value.bookSelectedChapterCount : chapterCount;
                await store.dispatch("getBookInChapter", { bible: bibleStore.value.bible, book: bibleStore.value.bookSelected, chapter: bibleStore.value.chapterSelected });
            },
            scrollViewChapterVerse() {
                let viewScrollTop = document.getElementById("view-chapter-verse")?.scrollTop;
                session.set("viewChapterVerseScrollTop", viewScrollTop);
            },
        };
    },
});
</script>
<style lang="scss">
#view-chapter-component {
    --view-chapter-top-width: 40px;
}

.verse-item {
    @apply flex items-center gap-10px mb-20px cursor-default p-20px dark:bg-gray-100 bg-gray-800 dark:bg-opacity-0 bg-opacity-0 dark:hover:bg-opacity-5 hover:bg-opacity-10;
}

.view-chapter-arrow-pointer {
    @apply dark:bg-gray-100 dark:bg-opacity-0 dark:hover:bg-opacity-30 hover:bg-gray-300 cursor-pointer p-10px rounded-[100%] duration-150;
}

.view-chapter-verse {
    @apply overflow-y-auto  h-[100%];
    height: calc(100% - var(--view-chapter-top-width));
}

@media only screen and (max-width: 1382px) {
    .verse-item {
        max-width: 380px;
    }
}
</style>