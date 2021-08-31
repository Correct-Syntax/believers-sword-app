<template>
    <div id="view-chapter-component" class="h-[100%] w-[100%]">
        <div id="view-chapter-component-wrapper" class="h-[100%] flex relative">
            <div id="view-chapter-left-side-bar" class="h-[100%] w-[100%] min-w-460px absolute">
                <div class="h-[100%] w-[100%] min-w-460px relative">
                    <div class="h-[var(--view-chapter-top-width)] shadow-md">
                        <div class="flex justify-center items-center">
                            <div class="flex items-center gap-20px text-size-13px items-center">
                                <div class="flex items-center whitespace-nowrap gap-[10px]">
                                    <span>Font Size: <span class="dark:bg-gray-200 bg-gray-600 dark:bg-opacity-10 bg-opacity-10 p-3px rounded-md">{{fontSize}}px</span></span>
                                    <div class="w-130px"> 
                                        <NSlider v-model:value="fontSize" :step="1" :min="13" :max="40" />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <NTooltip trigger="hover" size="small">
                                            <template #trigger>
                                                <div class="text-size-20px opacity-50 hover:opacity-95 cursor-pointer">
                                                    <i class="bx bx-bookmark"></i>
                                                </div>
                                            </template>
                                            <span>Bookmark</span>
                                        </NTooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                    <div class="m-20px">
                                        <div v-for="verse in bibleStore.viewBookChapter" :key="verse.v" class="verse-item">
                                            <div class="read-chapter-verse-number">
                                                {{ verse.v }}
                                            </div>
                                            <div v-if="verse.versions" class="w-[100%] max-w-700px text-justify flex flex-col gap-15px">
                                                <div v-for="version in verse.versions" :key="version.version">
                                                    <div class="leading-relaxed" :style="`font-size: ${fontSize}px`">
                                                        <span class="opacity-50 font-500">
                                                            <i> {{ getVersion(version.version) }}</i>
                                                        </span>
                                                        {{ version.text }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="verse-item-more-options">
                                                <n-popover trigger="hover" :show-arrow="false">
                                                    <template #trigger>
                                                        <div class="text-size-30px p-10px bg-gray-600 dark:text-gray-300 text-gray-100 rounded-[100%] cursor-pointer">
                                                            <i class="bx bx-dots-vertical-rounded"></i>
                                                        </div>
                                                    </template>
                                                    <div>
                                                        <div class="text-size-18px flex flex-col gap-[10px]">
                                                            <div class="cursor-pointer flex items-center gap-[7px] opacity-70 hover:opacity-100">
                                                                <i class="bx bx-bookmark"></i>
                                                                <span>Bookmark</span>
                                                            </div>
                                                            <div class="cursor-pointer flex items-center gap-[7px] opacity-70 hover:opacity-100">
                                                                <i class="bx bx-share-alt"></i>
                                                                <span>Share Verse</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </n-popover>
                                            </div>
                                        </div>
                                    </div>
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
            <div id="view-chapter-right-side-bar" class="h-[100%] w-[100%] min-w-100px dark:bg-black dark:bg-opacity-20 bg-gray-300 absolute right-0">
                <RightSide />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import session from "@/service/session";
import { viewChapterComponentLeftSideWidth } from "@/service/widthSizeConstantVariables";
import { dragSide } from "@/service/MouseDragResizePanel";
import RightSide from "@/components/ReadBiblePageComponents/RightSide/RightSide.vue";
import { NPopover, NSlider, NTooltip } from "naive-ui";

export default defineComponent({
    components: { RightSide, NPopover, NSlider, NTooltip },
    setup() {
        const store = useStore();
        const bibleStore = computed(() => store.state.bible);
        const fontSize = ref(14);
        const getVersion = (table: string) => {
            // eslint-disable-next-line
            let version = bibleStore.value.bibleVersions.filter((item: any) => item.table === table);
            return version ? version[0]?.abbreviation : "NONE";
        };

        onMounted(() => {
            let viewChapterVerseElement = document.getElementById("view-chapter-verse");
            const leftSideWidth = session.get(viewChapterComponentLeftSideWidth);
            document.getElementById("view-chapter-component-wrapper")?.style.setProperty("--view-chapter-left-width", `${leftSideWidth ? leftSideWidth : 1050}px`);
            dragSide("view-chapter-component-wrapper", "view-chapter-dragbar", "--view-chapter-left-width", 1800, 1050, viewChapterComponentLeftSideWidth);

            let viewReadChapterFontSize = session.get("viewReadChapterFontSize");
            if (viewReadChapterFontSize) {
                fontSize.value = viewReadChapterFontSize;
            }

            setTimeout(() => {
                const scrollTop = session.get("viewChapterVerseScrollTop");
                if (viewChapterVerseElement) viewChapterVerseElement.scrollTop = scrollTop ? scrollTop : 0;
            }, 100);
        });

        watch(fontSize, () => {
            fontSize.value = fontSize.value < 14 ? 14 : fontSize.value;
            session.set("viewReadChapterFontSize", fontSize.value);
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
            handleUpdateShow() {
                console.log("clicked");
            },
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
<style lang="scss">
#view-chapter-component {
    --view-chapter-top-width: 30px;
}

#view-chapter-component-wrapper {
    --view-chapter-left-width: 1000px;
    --minus-left-width: 33px;
}

#view-chapter-left-side-bar {
    width: calc(var(--view-chapter-left-width) - calc(var(--left-width) - var(--left-bar-width)) - var(--minus-left-width));
}

#view-chapter-right-side-bar {
    width: calc((100% - var(--view-chapter-left-width)) + calc(var(--left-width) - var(--left-bar-width)) + var(--minus-left-width));
}

#view-chapter-dragbar.drag-bar {
    @apply right-0 w-5px dark:opacity-0 opacity-0 dark:bg-light-50 bg-gray-600 h-[100%] dark:bg-opacity-30 bg-opacity-30 active:opacity-100 dark:active:opacity-100 duration-300 absolute top-0;
}

.verse-item {
    @apply flex items-center justify-between w-[100%] gap-20px mb-20px cursor-default p-20px dark:bg-gray-100 bg-gray-800 dark:bg-opacity-0 bg-opacity-0 dark:hover:bg-opacity-3 hover:bg-opacity-5;

    .read-chapter-verse-number {
        @apply w-[100%] max-w-[60px] flex justify-center items-center text-size-30px font-700 opacity-30 duration-150;
    }

    .verse-item-more-options {
        @apply opacity-0 invisible duration-150;
    }

    &:hover {
        .verse-item-more-options {
            @apply opacity-30 visible;
            &:hover {
                @apply dark:opacity-90 opacity-70;
            }
        }

        .read-chapter-verse-number {
            @apply opacity-100;
        }
    }
}

.view-chapter-arrow-pointer {
    @apply dark:bg-gray-100 dark:bg-opacity-0 dark:hover:bg-opacity-30 hover:bg-gray-300 cursor-pointer p-10px rounded-[100%] duration-150;
}

.view-chapter-verse {
    @apply overflow-y-auto  h-[100%];
    height: calc(100% - var(--view-chapter-top-width));
}

@media only screen and (max-width: 1623px) {
    #view-chapter-component-wrapper {
        --view-chapter-left-width: 1300px !important;
    }
}

@media only screen and (max-width: 1505px) {
    #view-chapter-component-wrapper {
        --view-chapter-left-width: 1200px !important;
    }
    .verse-item {
        max-width: 600px;
    }
}

@media only screen and (max-width: 1401px) {
    #view-chapter-component-wrapper {
        --view-chapter-left-width: 1190px !important;
    }
    .verse-item {
        max-width: 600px;
    }
}

@media only screen and (max-width: 1382px) {
    #view-chapter-component-wrapper {
        --view-chapter-left-width: 1100px !important;
    }
    .verse-item {
        max-width: 600px;
    }
}

@media only screen and (max-width: 1277px) {
    #view-chapter-component-wrapper {
        --view-chapter-left-width: 1000px !important;
    }
    .verse-item {
        max-width: 600px;
    }
}

@media only screen and (max-width: 1182px) {
    #view-chapter-component-wrapper {
        --view-chapter-left-width: 900px !important;
    }
    .verse-item {
        max-width: 600px;
    }
}
</style>