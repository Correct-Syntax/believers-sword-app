<template>
    <div class="menu-bar-icons h-[100%] flex flex-col justify-between z-50">
        <div class="flex flex-col gap-10px">
            <div class="icon-item" :class="{ 'active-menu-bar-item': readBibleIsSelected }" @click="selectReadBibleMenu()">
                <Icon :size="20" />
                <div class="tooltip">Read Bible</div>
            </div>
            <div class="icon-item" :class="{ 'active-menu-bar-item': $route.path === '/sermon' && readBibleIsSelected == false }" @click="selectRoute('/sermon')">
                <Icon name="anchor" :size="20" />
                <div class="tooltip">Go To Sermons</div>
            </div>
            <div class="icon-item" :class="{ 'active-menu-bar-item': $route.path === '/directions' && readBibleIsSelected == false }" @click="selectRoute('/directions')">
                <Icon name="direction" :size="20" />
                <div class="tooltip">Get Directions</div>
            </div>
            <div class="icon-item" :class="{ 'active-menu-bar-item': $route.path === '/prayer_list' && readBibleIsSelected == false }" @click="selectRoute('/prayer_list')">
                <Icon name="list" :size="20" />
                <div class="tooltip">Prayer List</div>
            </div>
            <div
                class="icon-item"
                :class="{ 'active-menu-bar-item': ($route.path === '/bible-talk' || pathSelected === '/bible-talk') && readBibleIsSelected == false }"
                @click="selectRoute('/bible-talk')"
            >
                <span class="font-500">BT</span>
                <div class="tooltip">Bible Talk</div>
            </div>
            <div
                class="icon-item"
                :class="{ 'active-menu-bar-item': ($route.path === '/games' || pathSelected === '/games') && readBibleIsSelected == false }"
                @click="selectRoute('/games')"
            >
                <Icon name="game" :size="20" />
                <div class="tooltip">Play Games</div>
            </div>
        </div>
        <div class="flex flex-col justify-center items-center gap-10px">
            <div class="icon-item heart-donate" :class="{ 'active-menu-bar-item': $route.path === '/donate' && readBibleIsSelected == false }" @click="selectRoute('/donate')">
                <Icon name="heart" :size="23" />
                <div class="tooltip">Donate / Support</div>
            </div>
            <div class="icon-item heart-donate" :class="{ 'active-menu-bar-item': $route.path === '/about' && readBibleIsSelected == false }" @click="selectRoute('/about')">
                <Icon name="question" :size="23" />
                <div class="tooltip">About</div>
            </div>
            <div class="icon-item" :class="{ 'active-menu-bar-item': $route.path === '/account' && readBibleIsSelected == false }" @click="selectRoute('/account')">
                <Icon name="user" :size="20" />
                <div class="tooltip">You Account</div>
            </div>
            <div class="icon-item" :class="{ 'active-menu-bar-item': $route.path === '/settings' && readBibleIsSelected == false }" @click="$store.state.showSettings = true">
                <Icon name="cog" :size="20" />
                <div class="tooltip">Settings</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import Icon from "@/components/Icon/Icon.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default defineComponent({
    components: { Icon },
    setup() {
        const store = useStore();
        const router = useRouter();
        const readBibleIsSelected = computed(() => store.state.readBibleMenuSelected);
        const storePathLocalKey = "pathRoute";
        const pathSelected = ref("");

        onMounted(() => {
            pathSelected.value = localStorage.getItem("pathSelected") || "";
        });

        return {
            pathSelected,
            readBibleIsSelected,
            selectReadBibleMenu() {
                store.state.readBibleMenuSelected = true;
                localStorage.removeItem(storePathLocalKey);
            },
            selectRoute(path: string) {
                pathSelected.value = path;
                localStorage.setItem("pathSelected", path);
                store.state.readBibleMenuSelected = false;
                localStorage.setItem(storePathLocalKey, path);
                router.push(path);
            }
        };
    }
});
</script>
<style lang="postcss">
.menu-bar-icons {
    @apply fixed h-[100%] top-0 left-0 py-35px;

    .icon-item {
        @apply flex justify-center items-center !w-[30px] !h-[30px] cursor-pointer text-size-18px dark:text-gray-400 text-gray-600 ml-4px duration-100 ml-5px;

        .bx,
        .codicon, span {
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
            .codicon, span {
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
