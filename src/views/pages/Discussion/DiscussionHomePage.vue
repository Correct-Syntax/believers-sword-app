<script setup lang="ts">
import { ref } from "vue";
import DiscussionPosts from "./DiscusstionPosts/DiscussionPosts.vue";
import TopFilter from "./TopFilter/TopFilter.vue";

const topFilterRef = ref();
const discussionPosts = ref();

function refresh() {
    discussionPosts.value.getPosts(true);
}
</script>
<template>
    <TopFilter ref="topFilterRef" @refresh="refresh" />
    <DiscussionPosts ref="discussionPosts" />
</template>
