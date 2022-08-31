<script setup lang="ts">
import { isUserLogged } from "@/service/backend/User";
import { ref } from "vue";
import { NCard, NButton } from "naive-ui";
import DiscussionPosts from "./DiscusstionPosts/DiscussionPosts.vue";
import TopFilter from "./TopFilter/TopFilter.vue";
import { useRouter } from "vue-router";

const topFilterRef = ref();
const discussionPosts = ref();
const isUserLoggedIn = isUserLogged();
const router = useRouter();

function refresh() {
    if (isUserLoggedIn) discussionPosts.value.getPosts(true);
}

function search(stringSearch: string | null) {
    discussionPosts.value.getPosts(true, stringSearch);
}
</script>
<template>
    <TopFilter ref="topFilterRef" @refresh="refresh" @search="search" />
    <DiscussionPosts v-if="isUserLoggedIn" ref="discussionPosts" />
    <NCard class="mt-5 flex flex-col items-center" v-else>
        You Must Login to View Posts.
        <div class="text-center mt-5">
            <NButton type="warning" @click="router.push({ name: 'AccountPage' })" round> Login </NButton>
        </div>
    </NCard>
</template>
