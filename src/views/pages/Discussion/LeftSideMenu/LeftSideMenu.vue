<script setup lang="ts">
import { NButton, NIcon } from "naive-ui";
import { NotePin16Regular, QuestionCircle32Regular, ChatArrowBack16Regular, CheckmarkCircle32Regular, Star16Regular, NotepadEdit16Regular } from "@vicons/fluent";
import { CloseOutline, Reply } from "@vicons/carbon";

const menus = [
    {
        icon: NotePin16Regular,
        label: "All Discussions",
        key: "all_discussions",
    },
    {
        icon: QuestionCircle32Regular,
        label: "My Questions",
        key: "my_questions",
    },
    {
        icon: ChatArrowBack16Regular,
        label: "My Participation",
        key: "my_participation",
    },
    {
        icon: CheckmarkCircle32Regular,
        label: "My Best Answer",
        key: "my_best_answer",
    },
    {
        icon: Star16Regular,
        label: "Following",
        key: "following",
    },
    {
        icon: Star16Regular,
        label: "Popular This Week",
        key: "popular_this_week",
    },
    {
        icon: Star16Regular,
        label: "Popular All Time",
        key: "popular_all_time",
    },
    {
        icon: CheckmarkCircle32Regular,
        label: "Solved",
        key: "solved",
    },
    {
        icon: CloseOutline,
        label: "Unsolved",
        key: "unsolved",
    },
    {
        icon: Reply,
        label: "No Replies",
        key: "no_replies",
    },
    {
        icon: NotepadEdit16Regular,
        label: "Leader Board",
        key: "leader_board",
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
        <NButton type="primary" size="large" round> <span class="font-600">Create New Discussion</span> </NButton>
    </div>
    <div class="flex flex-col gap-5px">
        <button
            v-for="menu in menus"
            :key="menu.key"
            class="text-left px-10px py-9px rounded-lg dark:hover:text-[var(--primaryColor)] text-size-15px dark:hover:bg-blue-100 dark:hover:bg-opacity-5 hover:bg-gray-900 hover:bg-opacity-5"
            :class="{
                '!text-[var(--primaryColor)] rounded-tl-none rounded-bl-none border-l-5px border-[var(--primaryColor)] border-opacity-50 dark:bg-blue-100 dark:bg-opacity-5':
                    props.modelValue === menu.key,
            }"
            @click="selectAMenu(menu)"
        >
            <NIcon :component="menu.icon" />
            {{ menu.label }}
        </button>
    </div>
</template>
