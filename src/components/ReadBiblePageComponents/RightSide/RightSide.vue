<template>
    <div id="right-side-bar" class="h-[100%] w-[100%]">
        <div class="h-[100%] w-[100%]">
            <SearchTab v-show="tabValue === 'searchTab'" />
            <SelectBibleVersions v-show="tabValue === 'versionsTab'" />
            <Bookmarks v-show="tabValue === 'bookmarksTab'" />
        </div>
        <div class="right-side-menu-bar fixed top-35px right-0px">
            <div class="flex flex-col gap-10px">
                <div class="icon-item" :class="{ 'active-menu-bar-item': tabValue === 'searchTab' }" @click="selectTab('searchTab')">
                    <div v-if="false" class="text-size-24px">
                        <i class="bx bx-search"></i>
                    </div>
                    <Icon v-else name="search" :size="22" />
                    <div class="tooltip">Search The Bible</div>
                </div>
                <div class="icon-item" :class="{ 'active-menu-bar-item': tabValue === 'versionsTab' }" @click="selectTab('versionsTab')">
                    <div v-if="false" class="text-size-24px">
                        <i class="bx bx-book-open"></i>
                    </div>
                    <Icon v-else name="server" :size="21" />
                    <div class="tooltip">Bible Versions</div>
                </div>
                <div class="icon-item" :class="{ 'active-menu-bar-item': tabValue === 'bookmarksTab' }" @click="selectTab('bookmarksTab')">
                    <div v-if="false" class="text-size-24px">
                        <i class="bx bx-bookmarks"></i>
                    </div>
                    <Icon v-else name="bookmark" :size="22" />
                    <div class="tooltip">Bookmarks</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import SelectBibleVersions from "./SelectBibleVersions/SelectBibleVersions.vue";
import SearchTab from "./Search/Search.vue";
import Bookmarks from "./Bookmarks/Bookmarks.vue";
import session from "@/service/session";
import Icon from "@/components/Icon/Icon.vue";
export default defineComponent({
    name: "ReadBibleChapterRightSide",
    components: { SelectBibleVersions, Bookmarks, SearchTab, Icon },
    setup() {
        const tabValue = ref("versionsTab");

        onMounted(() => {
            tabValue.value = session.get("rightSideSelectedTab") || "versionsTab";
        });

        return {
            tabValue,
            selectTab(e: any) {
                session.set("rightSideSelectedTab", e);
                tabValue.value = e;
            },
        };
    },
});
</script>
<style lang="scss">
#right-side-bar {
    --right-side-tab-height: 40px;
}

.right-side-menu-bar {
    .icon-item {
        @apply flex px-7px justify-center items-center h-[30px] cursor-pointer text-size-18px dark:text-gray-400 text-gray-600 pl-5px border-r-[1px] dark:border-gray-800 border-[#fff];
        .bx {
            @apply transform scale-110 duration-100  relative;
        }

        svg {
            @apply transform scale-100;
        }

        .tooltip {
            @apply invisible absolute right-[40px] dark:text-cool-gray-300 text-gray-700 px-[7px] py-[5px] rounded-md text-size-[15px] whitespace-nowrap opacity-0 duration-150 select-none;
            box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.481);
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
                @apply dark:bg-gray-800 bg-gray-100 dark:opacity-100 opacity-90;
                visibility: visible;
                z-index: 99999;
            }
        }

        &.active-menu-bar-item {
            @apply text-[var(--primaryColor)] border-r-[1px] border-[var(--primaryColor)];
            .bx {
                @apply scale-125;
            }

            &:hover {
                @apply text-[var(--primaryColor)];
            }
        }
    }
}
</style>