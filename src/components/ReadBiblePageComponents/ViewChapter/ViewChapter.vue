<template>
    <div id="view-chapter-component" class="h-[100%] w-[100%]">
        <div id="view-chapter-component-wrapper" class="h-[100%] flex relative">
            <div
                id="view-chapter-left-side-bar"
                class="h-[100%] w-[100%] min-w-460px relative"
                style="width: calc(var(--view-chapter-left-width) - calc(var(--left-width) - var(--left-bar-width)) - var(--minus-left-width) - 4px)"
            >
                <div class="h-[100%] w-[100%] min-w-460px relative">
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
                                    <VersesRender :viewBookChapter="bibleStore.viewBookChapter" :fontSize="fontSize" />
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
                <div id="view-chapter-dragbar" class="drag-bar" style="cursor: col-resize"></div>
            </div>
            <div id="view-chapter-right-side-bar" class="h-[100%] w-[100%] min-w-300px dark:bg-black dark:bg-opacity-20 bg-gray-200">
                <RightSide />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, watch } from "vue";
import { useStore } from "vuex";
import session from "@/service/session";
import RightSide from "@/components/ReadBiblePageComponents/RightSide/RightSide.vue";
import VersesRender from "@/components/ReadBiblePageComponents/ViewChapter/Verses/Verses.vue";
import TopOptionsBar from "@/components/ReadBiblePageComponents/ViewChapter/TopOptions/TopOptions.vue";

export default defineComponent({
    components: { RightSide, VersesRender, TopOptionsBar },
    setup() {
        const store = useStore();
        const bibleStore = computed(() => store.state.bible);
        const fontSize = computed(() => store.state.bible.viewChapterVersesFontSize);
        const selectedBookmark = computed(() => store.state.verseBookmark.selectedBookmark);

        const getVersion = (table: string) => {
            let version = bibleStore.value.bibleVersions.filter((item: any) => item.table === table);
            return version ? version[0]?.abbreviation : "NONE";
        };

        watch(selectedBookmark, async () => {
            let viewChapterVerseElement = document.getElementById("view-chapter-verse");
            setTimeout(() => {
                let el = document.getElementsByClassName("saved-bookmark-selected")[0];
                if (el instanceof HTMLElement) {
                    if (viewChapterVerseElement) viewChapterVerseElement.scrollTop = el.offsetTop ? el.offsetTop : 0;
                }
            }, 100);
        });

        onMounted(() => {
            let viewChapterVerseElement = document.getElementById("view-chapter-verse");
            const target = document.getElementById("view-chapter-dragbar");
            const wrapper = document.getElementById("view-chapter-component-wrapper");
            const sideLeftBar = document.getElementById("view-chapter-left-side-bar");
            let savedRightSideWidth = session.get("viewChapterRightSideBarWidth");
            if (!savedRightSideWidth) {
                session.set("viewChapterRightSideBarWidth", 300);
                savedRightSideWidth = session.get("viewChapterRightSideBarWidth");
            }
            let leftSideBarInitialWidth = savedRightSideWidth && wrapper && sideLeftBar ? wrapper?.clientWidth - savedRightSideWidth : 1000;
            document.getElementById("view-chapter-component-wrapper")?.style.setProperty("--view-chapter-left-width", `${leftSideBarInitialWidth + 260 + 36 + 33}px`);

            const resizeViewChapterArea = (e: any) => {
                if (wrapper && sideLeftBar) session.set("viewChapterRightSideBarWidth", wrapper?.clientWidth - sideLeftBar?.clientWidth);
                if (wrapper) wrapper.style.setProperty("--view-chapter-left-width", e.pageX + "px");
            };

            const clearEvent = () => {
                if (wrapper) wrapper.removeEventListener("mousemove", resizeViewChapterArea);
                if (wrapper) wrapper.classList.remove("resizing");
            };

            if (target)
                target.onmousedown = (e) => {
                    e.preventDefault();

                    if (wrapper) wrapper.addEventListener("mousemove", resizeViewChapterArea);
                    if (wrapper) wrapper.classList.add("resizing");
                };

            if (wrapper) wrapper.onmouseup = () => clearEvent();

            setTimeout(() => {
                const scrollTop = session.get("viewChapterVerseScrollTop");
                if (viewChapterVerseElement) viewChapterVerseElement.scrollTop = scrollTop ? scrollTop : 0;
            }, 300);
        });

        return {
            bibleStore,
            async clickPointer(action: string) {
                let chapterCount = action === "next" ? bibleStore.value.chapterSelected + 1 : bibleStore.value.chapterSelected - 1;
                bibleStore.value.chapterSelected = chapterCount < 1 ? 1 : chapterCount > bibleStore.value.bookSelectedChapterCount ? bibleStore.value.bookSelectedChapterCount : chapterCount;
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
                    value: "Go Let It Out",
                },
                {
                    label: "Who Feels Love?",
                    value: "Who Feels Love?",
                },
                {
                    label: "Sunday Morning Call",
                    value: "Sunday Morning Call",
                    disabled: true,
                },
                {
                    label: "Roll It Over",
                    value: "Roll It Over",
                },
            ],
        };
    },
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

#view-chapter-right-side-bar {
    width: calc((100% - var(--view-chapter-left-width)) + calc(var(--left-width) - var(--left-bar-width)) + var(--minus-left-width));
}

#view-chapter-dragbar.drag-bar {
    @apply right-0 w-5px dark:opacity-0 opacity-0 dark:bg-light-50 bg-gray-600 h-[100%] dark:bg-opacity-30 bg-opacity-30 active:opacity-100 dark:active:opacity-100 duration-300 absolute top-0;
}

.view-chapter-arrow-pointer {
    @apply opacity-30 hover:opacity-95 cursor-pointer p-10px duration-150;
}

.view-chapter-verse {
    @apply overflow-y-auto  h-[100%];
    height: calc(100% - var(--view-chapter-top-width));
}
</style>