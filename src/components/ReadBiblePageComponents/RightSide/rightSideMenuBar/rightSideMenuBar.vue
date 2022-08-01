<script lang="ts" setup>
import { computed, onMounted } from "vue";
import session from "@/service/session/session";
import { useStore } from "vuex";
import { NIcon } from "naive-ui";
import { Search, BareMetalServer, Bookmark, PaintBrush, DocumentAttachment, NotebookReference } from "@vicons/carbon";

import { useRightSideMenuTabs } from "@/store/ReadBibleRightSideStates";
import { storeToRefs } from "pinia";

const store = useStore();
const tabValue = computed(() => store.state.rightMenuTab);
const rightSideMenuTabStore = useRightSideMenuTabs();
const { toggleDictionaryBoxRightSide } = storeToRefs(rightSideMenuTabStore);

onMounted(() => {
    store.state.rightMenuTab = session.get("rightSideSelectedTab") || "versionsTab";
});

function selectTab(e: any) {
    session.set("rightSideSelectedTab", e);
    store.state.rightMenuTab = e;
}
</script>

<template>
    <div class="right-side-menu-bar fixed top-35px right-0px z-99 h-[calc(100%-70px)]">
        <div class="flex flex-col justify-between h-[100%]">
            <div class="flex flex-col gap-10px">
                <div class="icon-item" :class="{ 'active-menu-bar-item': tabValue === 'searchTab' }" @click="selectTab('searchTab')">
                    <NIcon size="25">
                        <Search />
                    </NIcon>
                    <div class="tooltip">{{ $t("search_the_bible") }}</div>
                </div>
                <div class="icon-item" :class="{ 'active-menu-bar-item': tabValue === 'versionsTab' }" @click="selectTab('versionsTab')">
                    <NIcon size="25">
                        <BareMetalServer />
                    </NIcon>
                    <div class="tooltip">{{ $t("bible_versions") }}</div>
                </div>
                <div class="icon-item" :class="{ 'active-menu-bar-item': tabValue === 'bookmarksTab' }" @click="selectTab('bookmarksTab')">
                    <NIcon size="25">
                        <Bookmark />
                    </NIcon>
                    <div class="tooltip">{{ $t("bookmarks") }}</div>
                </div>
                <div class="icon-item" :class="{ 'active-menu-bar-item': tabValue === 'MarkedHighlights' }" @click="selectTab('MarkedHighlights')">
                    <NIcon size="25">
                        <PaintBrush />
                    </NIcon>
                    <div class="tooltip">{{ $t("highlights") }}</div>
                </div>
                <div class="icon-item" :class="{ 'active-menu-bar-item': tabValue === 'MyNotes' }" @click="selectTab('MyNotes')">
                    <NIcon size="25">
                        <DocumentAttachment />
                    </NIcon>
                    <div class="tooltip">{{ $t("clip_notes") }}</div>
                </div>
            </div>
            <div class="icon-item" :class="{ 'active-menu-bar-item': toggleDictionaryBoxRightSide }" @click="rightSideMenuTabStore.setRightSideBottomSelectedTab('dictionary')">
                <NIcon size="25">
                    <NotebookReference />
                </NIcon>
                <div class="tooltip">{{ $t("dictionary") }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="postcss">
.right-side-menu-bar {
    .icon-item {
        @apply flex px-7px justify-center items-center !h-[30px] !w-[30px] cursor-pointer dark:text-gray-400 text-gray-600 mr-4px;
        .bx {
            @apply transform scale-110 duration-100  relative;
        }

        svg {
            @apply transform scale-100;
        }

        .tooltip {
            @apply invisible absolute right-[40px] dark:text-cool-gray-300 text-gray-700 px-[7px] py-[5px] rounded-md text-size-[15px] whitespace-nowrap opacity-0 duration-150 select-none z-99;
            box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.481);
            z-index: 999999;
        }

        &:hover {
            @apply dark:text-gray-300 text-gray-800;

            .bx {
                @apply scale-125;
            }

            svg {
                @apply transform scale-110;
            }

            .tooltip {
                @apply dark:bg-gray-800 bg-opacity-100 dark:opacity-100 bg-gray-100 opacity-100;
                visibility: visible;
                z-index: 99999;
            }
        }

        &.active-menu-bar-item {
            @apply dark:text-gray-900 text-gray-50 bg-[var(--primaryColor)] rounded-md duration-100;

            .bx {
                @apply scale-125;
            }

            &:hover {
                @apply dark:text-gray-900 text-gray-50;
            }
        }
    }
}
</style>
