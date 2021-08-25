<template>
    <div class="menu-bar-icons flex flex-col h-[100%] gap-10px py-10px mr-7px z-50">
        <div class="icon-item">
            <i class='bx bx-book' ></i>
        </div>
        <div class="icon-item">
            <i class='bx bx-message-square-detail' ></i>
        </div>
        <div class="icon-item">
            <i class='bx bx-user' ></i>
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
        @apply flex justify-center items-center h-[30px] cursor-pointer text-size-18px transform scale-110 duration-100 text-gray-500 relative;

        &:hover {
            @apply scale-125 text-gray-200;
        }
    }
}
</style>
