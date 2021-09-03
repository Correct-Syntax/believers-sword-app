<template>
    <div class="menu-bar-icons h-[100%] flex flex-col justify-between pb-10px mr-7px z-50">
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
        </div>
        <div class="flex flex-col gap-10px">
            <div class="icon-item" :class="{ 'active-menu-bar-item': $route.path === '/donate' && readBibleIsSelected == false }" @click="selectRoute('/donate')">
                <Icon class="hover:text-yellow-400" name="heart" :size="22" />
                <div class="tooltip">Donate</div>
            </div>
            <div class="icon-item" :class="{ 'active-menu-bar-item': $route.path === '/help' && readBibleIsSelected == false }" @click="selectRoute('/help')">
                <Icon name="question" :size="22" />
                <div class="tooltip">Help</div>
            </div>
            <div class="icon-item" :class="{ 'active-menu-bar-item': $route.path === '/account' && readBibleIsSelected == false }" @click="selectRoute('/account')">
                <Icon name="user" :size="20" />
                <div class="tooltip">You Account</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import Icon from "@/components/Icon/Icon.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default defineComponent({
    components: { Icon },
    setup() {
        const store = useStore();
        const router = useRouter();
        const readBibleIsSelected = computed(() => store.state.readBibleMenuSelected);

        return {
            readBibleIsSelected,
            selectReadBibleMenu() {
                store.state.readBibleMenuSelected = true;
            },
            selectRoute(path: string) {
                store.state.readBibleMenuSelected = false;
                router.push(path);
            },
        };
    },
});
</script>
<style lang="scss">
.menu-bar-icons {
    .icon-item {
        @apply flex justify-center items-center h-[30px] cursor-pointer text-size-18px dark:text-gray-400 text-gray-600 pl-5px border-l-[1px] dark:border-gray-800 border-[#fff];
        .bx {
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
            @apply text-[var(--primaryColor)] border-l-[1px] border-[var(--primaryColor)];
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
