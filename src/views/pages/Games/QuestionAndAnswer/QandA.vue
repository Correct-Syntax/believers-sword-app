<template>
    <div class="relative">
        <button @click="goBack()" class="top-0 right-0 absolute p-10px rounded-md dark:bg-gray-700 hover:dark:bg-[var(--primaryColor)] bg-gray-300 hover:bg-[var(--primaryColor)]">
            Go Back
        </button>
        This is q and a game
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    setup() {
        const router = useRouter();

        return {
            goBack: () => {
                router.go(-1);
            },
        };
    },
});
</script>
