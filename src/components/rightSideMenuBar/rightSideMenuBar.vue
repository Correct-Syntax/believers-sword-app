<template>
    <div class="right-side-menu-bar fixed top-35px right-0px z-99">
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
            <div class="icon-item" :class="{ 'active-menu-bar-item': tabValue === 'MarkedHighlights' }" @click="selectTab('MarkedHighlights')">
                <div v-if="false" class="text-size-22px">
                    <i class="bx bx-highlight"></i>
                </div>
                <Icon v-else name="paintBrush" :size="22" />
                <div class="tooltip">Highlights</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import session from "@/service/session/session";
import Icon from "@/components/Icon/Icon.vue";
import { useStore } from "vuex";
export default defineComponent({
    name: "ReadBibleChapterRightSide",
    components: { Icon },
    setup() {
        const store = useStore();
        const tabValue = computed(() => store.state.rightMenuTab);

        onMounted(() => {
            store.state.rightMenuTab = session.get("rightSideSelectedTab") || "versionsTab";
        });

        return {
            tabValue,
            selectTab(e: any) {
                session.set("rightSideSelectedTab", e);
                store.state.rightMenuTab = e;
            },
        };
    },
});
</script>

<style lang="postcss">
.right-side-menu-bar {
    .icon-item {
        @apply flex px-7px justify-center items-center !h-[35px] !w-[35px] cursor-pointer dark:text-gray-400 text-gray-600 mr-4px;
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

            .bx,
            .codicon {
                @apply scale-125;
            }

            &:hover {
                @apply dark:text-gray-900 text-gray-50;
            }
        }
    }
}
</style>