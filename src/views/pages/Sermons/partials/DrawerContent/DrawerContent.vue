<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import ArticleContentVue from "./Partial/ArticleContent.vue";
import YoutubeContentVue from "./Partial/YoutubeContent.vue";

const store = useStore();
const selectedSermonContent = computed(() => store.state.sermonState.selected_sermon);
</script>

<template>
    <div>
        <YoutubeContentVue v-if="selectedSermonContent && selectedSermonContent.type == 'youtube'" />
        <ArticleContentVue v-else />
    </div>
</template>
