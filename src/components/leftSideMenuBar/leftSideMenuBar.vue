<template>
    <div class="menu-bar-icons h-[100%] flex flex-col justify-between pb-10px mr-7px z-50">
        <div class="flex flex-col gap-10px">
            <div class="icon-item" :class="{ 'active-menu-bar-item': $route.path === '/' }" @click="$router.push('/')">
                <i class="bx bx-book"></i>
                <div class="tooltip">Read Bible</div>
            </div>
            <div class="icon-item" :class="{ 'active-menu-bar-item': $route.path === '/sermon' }" @click="$router.push('/sermon')">
                <i class="bx bx-message-square-detail"></i>
                <div class="tooltip">Go To Sermons</div>
            </div>
            <div class="icon-item" :class="{ 'active-menu-bar-item': $route.path === '/directions' }" @click="$router.push('/directions')">
                <i class="bx bx-directions"></i>
                <div class="tooltip">Get Directions</div>
            </div>
        </div>
        <div class="flex flex-col gap-10px">
            <div class="icon-item" :class="{ 'active-menu-bar-item': $route.path === '/donate' }" @click="$router.push('/donate')">
                <i class="bx bx-donate-heart text-yellow-400"></i>
                <div class="tooltip">Donate</div>
            </div>
            <div class="icon-item" :class="{ 'active-menu-bar-item': $route.path === '/help' }" @click="$router.push('/help')">
                <i class="bx bx-help-circle"></i>
                <div class="tooltip">Help</div>
            </div>
            <div class="icon-item" :class="{ 'active-menu-bar-item': $route.path === '/account' }" @click="$router.push('/account')">
                <i class="bx bx-user"></i>
                <div class="tooltip">Check You Account</div>
            </div>
            <div class="icon-item" :class="{ 'active-menu-bar-item': $route.path === '/settings' }" @click="$router.push('/settings')">
                <i class="bx bx-cog"></i>
                <div class="tooltip">Settings</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>
<style lang="scss">
.menu-bar-icons {
    .icon-item {
        @apply flex justify-center items-center h-[30px] cursor-pointer text-size-18px dark:text-gray-400 text-gray-600 pl-6px;
        .bx {
            @apply transform scale-110 duration-100  relative;
        }

        .tooltip {
            @apply invisible absolute left-30px dark:text-cool-gray-300 text-gray-700 px-[5px] py-[3px] rounded-md text-size-[13px] whitespace-nowrap opacity-0 duration-150;
            box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.481);
        }

        &:hover {
            @apply dark:text-gray-300 text-gray-800;

            .bx {
                @apply scale-125;
            }

            .tooltip {
                @apply dark:bg-gray-800 bg-gray-100 dark:opacity-100 opacity-90;
                visibility: visible;
                z-index: 99999;
            }
        }
    }

    .active-menu-bar-item {
        @apply dark:text-gray-300 text-gray-800 border-l-[1px];
        .bx {
            @apply scale-125;
        }
    }
}
</style>
