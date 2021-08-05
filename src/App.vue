<template>
    <div class="dark h-[100vh]">
        <div
            class="
                dark:bg-gray-800
                dark:text-gray-100
                h-[calc(100%-30px)]
                overflow-y-auto
            "
        >
            <MainView />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainView from "./views/Main.vue"

export default defineComponent({
    name: "App",
    components: { MainView },
});
</script>
