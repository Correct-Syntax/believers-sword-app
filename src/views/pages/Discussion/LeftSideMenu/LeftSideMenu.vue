<script setup lang="ts">
import { NButton, NIcon } from "naive-ui";
import { NotePin16Regular, QuestionCircle32Regular, ChatArrowBack16Regular, CheckmarkCircle32Regular, Star16Regular, NotepadEdit16Regular } from "@vicons/fluent";
import { CloseOutline, Reply } from "@vicons/carbon";
import CreateNewDiscussionModalVue from "./CreateDiscussionModal/CreateNewDiscussionModal.vue";

import { isUserLogged } from "@/service/backend/User";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isUserSigned = isUserLogged();
const showCreateDiscussionModal = ref(false);
const menus = [
    {
        icon: NotePin16Regular,
        label: "All Discussions",
        key: "all_discussions",
        show: true
    },
    {
        icon: QuestionCircle32Regular,
        label: "My Questions",
        key: "my_questions",
        show: isUserSigned
    },
    {
        icon: ChatArrowBack16Regular,
        label: "My Participation",
        key: "my_participation",
        show: isUserSigned
    },
    {
        icon: CheckmarkCircle32Regular,
        label: "My Best Answer",
        key: "my_best_answer",
        show: isUserSigned
    },
    {
        icon: Star16Regular,
        label: "Following",
        key: "following",
        show: isUserSigned
    },
    {
        icon: Star16Regular,
        label: "Popular This Week",
        key: "popular_this_week",
        show: true
    },
    {
        icon: Star16Regular,
        label: "Popular All Time",
        key: "popular_all_time",
        show: true
    },
    {
        icon: CheckmarkCircle32Regular,
        label: "Solved",
        key: "solved",
        show: true
    },
    {
        icon: CloseOutline,
        label: "Unsolved",
        key: "unsolved",
        show: true
    },
    {
        icon: Reply,
        label: "No Replies",
        key: "no_replies",
        show: isUserSigned
    },
    {
        icon: NotepadEdit16Regular,
        label: "Leader Board",
        key: "leader_board",
        show: true
    },
];

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
function selectAMenu(menu: { key: string; label: string; icon: any }) {
    emit("update:modelValue", menu.key);
}
</script>
<template>
    <div class="flex flex-col mb-30px">
        <CreateNewDiscussionModalVue v-model="showCreateDiscussionModal" @close="showCreateDiscussionModal = false" />
        <NButton v-if="isUserSigned" type="primary" size="large" round
            @click="showCreateDiscussionModal = !showCreateDiscussionModal">
            <span class="font-600">
                Create New Discussion
            </span>
        </NButton>
        <NButton v-else type="primary" size="large" round @click="router.push('/account')">
            <span class="font-600">
                Login to Create Discussion
            </span>
        </NButton>
    </div>
    <div class="flex flex-col gap-5px">
        <template v-for="menu in menus" :key="menu.key">
            <button v-if="menu.show"
                class="text-left px-10px py-9px rounded-lg dark:hover:text-[var(--primaryColor)] text-size-15px dark:hover:bg-blue-100 dark:hover:bg-opacity-5 hover:bg-gray-900 hover:bg-opacity-5"
                :class="{
                    '!text-[var(--primaryColor)] rounded-tl-none rounded-bl-none border-l-5px border-[var(--primaryColor)] border-opacity-50 dark:bg-blue-100 dark:bg-opacity-5':
                        props.modelValue === menu.key,
                }" @click="selectAMenu(menu)">
                <NIcon :component="menu.icon" />
                {{ menu.label }}
            </button>
        </template>
    </div>
</template>
