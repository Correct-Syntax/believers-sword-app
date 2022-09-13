<script setup lang="ts">
import { View, AddComment } from "@vicons/carbon";
import { NIcon, NTag } from "naive-ui";
import { discussionPostStore } from "@/store/DiscussionPostsState";
import { onMounted } from "vue";
import { generateText } from "@tiptap/vue-3";
import { extensionsUsed } from "@/components/Editor/editor-options";
import sanitizeHtml from "sanitize-html";
import { ThumbsUp, ThumbsUpFilled, ThumbsDown, ThumbsDownFilled } from "@vicons/carbon";
import { useRouter } from "vue-router";

const postStore = discussionPostStore();
const router = useRouter();
function countRender(upVoteCount: number, downVoteCount: number) {
    let sum = upVoteCount - downVoteCount;
    if (sum > 100 || sum < -100) return (sum / 1000).toFixed(1) + "K";
    return sum;
}

const getPosts = async () => {
    console.log("Click the get posts button");
};

function clickThumb(discussion: any, isThumbsUp = 1, index: null | number = null) {
    console.log(discussion, isThumbsUp, index);
}

defineExpose({
    getPosts,
});

onMounted(() => {
    getPosts();
});
</script>
<template>
    <div class="mt-30px">
        <div
            class="flex gap-5 mb-20px w-[100%] dark:bg-opacity-5 dark:bg-light-50 px-5 py-3 rounded-lg dark:hover:bg-opacity-10 transition duration-200 cursor-pointer bg-white darK:border dark:hover:border-light-50 dark:border-opacity-0 dark:hover:!border-opacity-100"
            v-for="(post, index) in postStore.posts"
            :key="post._id"
            @click="router.push({ name: 'DiscussionView', params: { id: post._id } })"
        >
            <div class="flex flex-col gap-1 items-center">
                <NIcon
                    size="25"
                    v-on:click.stop="clickThumb(post, 1, index)"
                    class="dark:hover:text-blue-400 hover:text-blue-600"
                    :class="{ 'text-blue-500': post.up_votes.length }"
                >
                    <ThumbsUpFilled v-if="post.up_votes.length" />
                    <ThumbsUp v-else />
                </NIcon>
                <div class="text-size-20px">
                    {{ countRender(post.up_vote_count, post.down_vote_count) }}
                </div>
                <NIcon
                    size="25"
                    v-on:click.stop="clickThumb(post, 0, index)"
                    class="dark:hover:text-red-500 hover:text-red-600"
                    :class="{ 'text-red-500': post.down_votes.length }"
                >
                    <ThumbsDownFilled v-if="post.down_votes.length" />
                    <ThumbsDown v-else />
                </NIcon>
            </div>
            <div>
                <img
                    class="w-80px"
                    src="https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
                />
            </div>
            <div class="w-full">
                <div class="flex justify-between items-center">
                    <h2 class="text-size-20px">{{ post.title }}</h2>
                    <div class="flex items-center gap-5px">
                        <div>
                            <NIcon>
                                <View />
                            </NIcon>
                            <span class="ml-2">
                                {{ post.views ? post.views : 0 }}
                            </span>
                        </div>
                        <div>
                            <NIcon>
                                <AddComment />
                            </NIcon>
                            <span class="ml-2">
                                {{ post.comment_count ? post.comment_count : 0 }}
                            </span>
                        </div>
                        <NTag round type="info">
                            {{ post.category }}
                        </NTag>
                    </div>
                </div>
                <div>{{ sanitizeHtml(generateText(post.content, extensionsUsed).trim()).substring(0, 500) }}...</div>
            </div>
        </div>
    </div>
</template>
