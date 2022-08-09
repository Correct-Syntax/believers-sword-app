<script setup lang="ts" >
import { View, AddComment } from "@vicons/carbon";
import { NButton, NIcon } from "naive-ui";
import { discussionPostStore } from "@/store/DiscussionPostsState"
import { onMounted } from "vue";
import { generateText } from "@tiptap/vue-3"
import { extensionsUsed } from "@/components/Editor/editor-options"
import sanitizeHtml from 'sanitize-html';
import { ThumbsUp, ThumbsUpFilled, ThumbsDown, ThumbsDownFilled } from "@vicons/carbon"

const postStore = discussionPostStore();
function countRender(upVoteCount: number, downVoteCount: number) {
    let sum = upVoteCount - downVoteCount;
    if (sum > 100 || sum < -100) return (sum / 1000).toFixed(1) + "K";
    return sum;
}
onMounted(async () => {
    if (postStore.posts.length < 1) {
        await postStore.getPosts({
            search: '',
            page: 1
        });
    }
});
</script>
<template>
    <div class="mt-40px">
        <div class="flex gap-5 mb-20px w-[100%] dark:bg-opacity-5 dark:bg-light-50 px-5 py-3 rounded-lg dark:hover:bg-opacity-10 transition duration-200 cursor-pointer bg-white darK:border  dark:hover:border-light-50 dark:border-opacity-0 dark:hover:!border-opacity-100"
            v-for="post in postStore.posts" :key="post._id">
            <div class="flex flex-col gap-1 items-center">
                <NIcon size="25" class="dark:hover:text-blue-400 hover:text-blue-600">
                    <ThumbsUp />
                </NIcon>
                <div class="text-size-20px">
                    {{ countRender(post.up_vote_count, post.down_vote_count) }}
                </div>
                <NIcon size="25" class="dark:hover:text-red-500 hover:text-red-600">
                    <ThumbsDown />
                </NIcon>
            </div>
            <div>
                <img class="w-80px"
                    src="https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg" />
            </div>
            <div class="w-full">
                <div class="flex justify-between items-center">
                    <h2 class="text-size-20px">This is the title</h2>
                    <div class="flex items-center gap-5px">
                        <div>
                            <NIcon>
                                <View />
                            </NIcon>
                            <span class="ml-2">30</span>
                        </div>
                        <div>
                            <NIcon>
                                <AddComment />
                            </NIcon>
                            <span class="ml-2">30</span>
                        </div>
                        <NButton size="small" round tertiary>Here</NButton>
                    </div>
                </div>
                <div>{{ sanitizeHtml(generateText(post.content, extensionsUsed).trim()) }}</div>
            </div>
        </div>
    </div>
</template>