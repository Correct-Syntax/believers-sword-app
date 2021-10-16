<template>
    <div v-if="clipNote" class="flex justify-start pl-100px">
        <div
            class="px-7px py-3px text-gray-900 rounded-bl-md rounded-br-md w-[100%] max-w-700px -mt-[1px] relative"
            :class="{ 'dark:bg-gray-300 bg-gray-700 dark:text-gray-800 text-light-200': clipNote.color === 'default' }"
            :style="`background-color: ${clipNote.color}`"
        >
            <span>
                <i class="bx bx-note"></i>
            </span>
            {{ clipNote.note }}
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        clipNote: { type: [Object, Boolean], default: false }
    }
});
</script>
