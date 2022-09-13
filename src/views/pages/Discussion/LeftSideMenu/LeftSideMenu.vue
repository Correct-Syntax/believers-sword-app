<script setup lang="ts">
import { NButton, NIcon } from "naive-ui";
import { NotePin16Regular } from "@vicons/fluent";
import CreateNewDiscussionModalVue from "./CreateDiscussionModal/CreateNewDiscussionModal.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";

const router = useRouter();
const userStore = useUserStore();
const showCreateDiscussionModal = ref(false);
const menus = [
    {
        icon: NotePin16Regular,
        label: "All Discussions",
        key: "Discussion",
        show: true,
    },
];

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue", "clickedMenu"]);
function selectAMenu(menu: { key: string; label: string; icon: any }) {
    console.log(menu)
    emit("update:modelValue", menu.key);
    emit("clickedMenu", menu.key);
}
</script>
<template>
    <div class="flex flex-col mb-30px">
        <CreateNewDiscussionModalVue v-model="showCreateDiscussionModal" @close="showCreateDiscussionModal = false" />
        <NButton
            v-if="userStore.isUserLogged"
            type="primary"
            size="large"
            round
            @click="showCreateDiscussionModal = !showCreateDiscussionModal"
        >
            <span class="font-600"> Create New Discussion </span>
        </NButton>
        <NButton v-else type="primary" size="large" round @click="router.push('/account')">
            <span class="font-600"> Login to Create Discussion </span>
        </NButton>
    </div>
    <div class="flex flex-col gap-5px">
        <template v-for="menu in menus" :key="menu.key">
            <button
                v-if="menu.show"
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
        </template>
    </div>
</template>
