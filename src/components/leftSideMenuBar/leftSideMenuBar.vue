<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { NIcon } from "naive-ui";

import Book from "@vicons/carbon/Book";
import MessageQueue from "@vicons/carbon/MessageQueue";
import DirectionFork from "@vicons/carbon/DirectionFork";
import ListDropdown from "@vicons/carbon/ListDropdown";
import GameConsole from "@vicons/carbon/GameConsole";
import LocationHeart from "@vicons/carbon/LocationHeart";
import Help from "@vicons/carbon/Help";
import UserAvatar from "@vicons/carbon/UserAvatar";
import Settings from "@vicons/carbon/Settings";

const store = useStore();
const router = useRouter();
const pathSelected = ref("");
const showUnRoutePage = computed(() => store.state.showUnRoutePage);

async function selectRoute(path: string) {
    store.state.showUnRoutePage = "false";
    pathSelected.value = path;
    localStorage.setItem("pathSelected", path);
    localStorage.setItem("UnRoutePageSelected", "false");
    await router.push(path);
}

function selectUnRoutedPage(name: string) {
    store.state.showUnRoutePage = name;
    localStorage.setItem("UnRoutePageSelected", name);
}

onMounted(() => {
    const IsSelectedUnRoutePage = localStorage.getItem("UnRoutePageSelected");
    if (IsSelectedUnRoutePage && IsSelectedUnRoutePage != "false") {
        store.state.showUnRoutePage = IsSelectedUnRoutePage;
    } else {
        let pathSelectedSaved = localStorage.getItem("pathSelected");
        if (pathSelectedSaved) {
            selectRoute(pathSelectedSaved);
        }
    }
});
</script>

<template>
    <div class="menu-bar-icons h-[100%] flex flex-col justify-between z-50">
        <div class="flex flex-col gap-10px">
            <div class="icon-item" :class="{ 'active-menu-bar-item': showUnRoutePage == 'showBible' }" @click="selectUnRoutedPage('showBible')">
                <NIcon :size="25">
                    <Book />
                </NIcon>
                <div class="tooltip">Read Bible</div>
            </div>
            <div class="icon-item" :class="{ 'active-menu-bar-item': showUnRoutePage == 'showSermons' }" @click="selectUnRoutedPage('showSermons')">
                <NIcon :size="25">
                    <MessageQueue />
                </NIcon>
                <div class="tooltip">Go To Sermons</div>
            </div>
            <div class="icon-item" :class="{ 'active-menu-bar-item': pathSelected === '/directions' && showUnRoutePage == `false` }" @click="selectRoute('/directions')">
                <NIcon :size="25">
                    <DirectionFork />
                </NIcon>
                <div class="tooltip">Get Directions</div>
            </div>
            <div class="icon-item" :class="{ 'active-menu-bar-item': pathSelected === '/prayer_list' && showUnRoutePage == `false` }" @click="selectRoute('/prayer_list')">
                <NIcon :size="25">
                    <ListDropdown />
                </NIcon>
                <div class="tooltip">Prayer List</div>
            </div>
            <div class="icon-item" :class="{ 'active-menu-bar-item': pathSelected === '/bible-talk' && showUnRoutePage == `false` }" @click="selectRoute('/bible-talk')">
                <span class="font-500">BT</span>
                <div class="tooltip">Bible Talk</div>
            </div>
            <div class="icon-item" :class="{ 'active-menu-bar-item': pathSelected === '/games' && showUnRoutePage == `false` }" @click="selectRoute('/games')">
                <NIcon :size="25">
                    <GameConsole />
                </NIcon>
                <div class="tooltip">Play Games</div>
            </div>
        </div>
        <div class="flex flex-col justify-center items-center gap-10px">
            <div class="icon-item heart-donate" :class="{ 'active-menu-bar-item': $route.path === '/donate' && showUnRoutePage == `false` }" @click="selectRoute('/donate')">
                <NIcon :size="25">
                    <LocationHeart />
                </NIcon>
                <div class="tooltip">Donate / Support</div>
            </div>
            <div class="icon-item heart-donate" :class="{ 'active-menu-bar-item': $route.path === '/about' && showUnRoutePage == `false` }" @click="selectRoute('/about')">
                <NIcon :size="25">
                    <Help />
                </NIcon>
                <div class="tooltip">About</div>
            </div>
            <div class="icon-item" :class="{ 'active-menu-bar-item': $route.path === '/account' && showUnRoutePage == `false` }" @click="selectRoute('/account')">
                <NIcon :size="25">
                    <UserAvatar />
                </NIcon>
                <div class="tooltip">Your Account</div>
            </div>
            <div class="icon-item" :class="{ 'active-menu-bar-item': $route.path === '/settings' && showUnRoutePage == `false` }" @click="store.state.showSettings = true">
                <NIcon :size="25">
                    <Settings />
                </NIcon>
                <div class="tooltip">Settings</div>
            </div>
        </div>
    </div>
</template>

<style lang="postcss">
.menu-bar-icons {
    @apply fixed h-[100%] top-0 left-0 py-35px;

    .icon-item {
        @apply flex justify-center items-center !w-[30px] !h-[30px] cursor-pointer text-size-18px dark:text-gray-400 text-gray-600 ml-4px duration-100 ml-5px;

        .bx,
        span {
            @apply transform scale-110 duration-100  relative;
        }

        svg {
            @apply transform scale-100;
        }

        .tooltip {
            @apply invisible absolute left-40px dark:text-cool-gray-300 text-gray-700 px-[7px] py-[5px] rounded-md text-size-[15px] whitespace-nowrap opacity-0 duration-150 select-none;
            box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.481);
        }

        &:hover {
            @apply dark:text-gray-300 text-gray-800;

            .bx,
            span {
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
