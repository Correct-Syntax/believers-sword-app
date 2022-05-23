<template>
    <div class="h-[100%] p-7px">
        <router-view></router-view>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
    setup() {
        const isOnline = ref(true);

        onMounted(() => {
            window.addEventListener("online", () => (isOnline.value = true));
            window.addEventListener("offline", () => (isOnline.value = false));
        });
    },
});
</script>
