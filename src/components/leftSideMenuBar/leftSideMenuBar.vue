<template>
    <div class="menu-bar-icons h-[100%] flex flex-col justify-between pb-10px mr-7px z-50">
        <div class="flex flex-col gap-10px">
            <div class="icon-item" :class="{ 'active-menu-bar-item': $route.path === '/' }" @click="$router.push('/')">
                <Icon :size="20" />
                <div class="tooltip">Read Bible</div>
            </div>
            <div class="icon-item" :class="{ 'active-menu-bar-item': $route.path === '/sermon' }" @click="$router.push('/sermon')">
                <Icon name="anchor" :size="20" />
                <div class="tooltip">Go To Sermons</div>
            </div>
            <div class="icon-item" :class="{ 'active-menu-bar-item': $route.path === '/directions' }" @click="$router.push('/directions')">
                <Icon name="direction" :size="20" />
                <div class="tooltip">Get Directions</div>
            </div>
        </div>
        <div class="flex flex-col gap-10px">
            <div class="icon-item" :class="{ 'active-menu-bar-item': $route.path === '/donate' }" @click="$router.push('/donate')">
                <Icon class="hover:text-yellow-400" name="heart" :size="22" />
                <div class="tooltip">Donate</div>
            </div>
            <div class="icon-item" :class="{ 'active-menu-bar-item': $route.path === '/help' }" @click="$router.push('/help')">
                <Icon name="question" :size="22" />
                <div class="tooltip">Help</div>
            </div>
            <div class="icon-item" :class="{ 'active-menu-bar-item': $route.path === '/account' }" @click="$router.push('/account')">
                <Icon name="user" :size="20" />
                <div class="tooltip">You Account</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Icon from "@/components/Icon/Icon.vue";
export default defineComponent({
    components: { Icon },
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
    }

    .active-menu-bar-item {
        @apply dark:text-[var(--darkPrimaryColor)]  text-gray-800 text-[var(--lightPrimaryColor)] border-l-[1px] dark:border-[var(--darkPrimaryColor)] border-[var(--lightPrimaryColor)];
        .bx {
            @apply scale-125;
        }

        &:hover {
            @apply dark:text-[var(--darkPrimaryColor)] text-gray-800;
        }
    }
}
</style>
