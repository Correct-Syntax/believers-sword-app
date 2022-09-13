<script setup lang="ts">
import { ref } from "vue";
import { NCard, NButton } from "naive-ui";
import DiscussionPosts from "./DiscusstionPosts/DiscussionPosts.vue";
import TopFilter from "./TopFilter/TopFilter.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";

const topFilterRef = ref();
const discussionPosts = ref();
// const isUserLoggedIn = isUserLogged();
const userStore = useUserStore();
const router = useRouter();

function refresh() {
    if (userStore.isUserLogged) discussionPosts.value.getPosts(true);
}

function search(stringSearch: string | null) {
    discussionPosts.value.getPosts(true, stringSearch);
}
</script>
<template>
    <TopFilter ref="topFilterRef" @refresh="refresh" @search="search" />
    <DiscussionPosts v-if="userStore.isUserLogged" ref="discussionPosts" />
    <NCard class="mt-5 flex flex-col items-center" v-else>
        You Must Login to View Posts.
        <div class="text-center mt-5">
            <NButton type="warning" @click="router.push({ name: 'AccountPage' })" round> Login </NButton>
        </div>
    </NCard>
</template>
