<script setup lang="ts">
import { NPopselect, NButton, NIcon, NInput, NInputGroup } from "naive-ui";
import { h, ref } from "vue";
import { Search, Close } from "@vicons/carbon";
import discussion_categories from "../discussion_categories";
import { isUserLogged } from "@/service/backend/User";

const categories = discussion_categories;
const selectedCategory = ref<string | null>("all_discussions");
const emit = defineEmits(["refresh", "search"]);
const isUserLoggedIn = isUserLogged();
const searchString = ref(null);

function renderLabel(option: any) {
    return h("span", { class: "flex gap-5px items-center text-size-16px" }, [
        h(NIcon, { size: 25 }, { default: () => h(option.icon) }),
        option.label as string,
    ]);
}

function searchHandle() {
    emit("search", searchString.value);
}
</script>
<template>
    <div class="flex w-[100%] justify-between">
        <div>
            <NPopselect
                v-model:value="selectedCategory"
                trigger="click"
                :options="categories"
                :render-label="renderLabel"
                :disabled="!isUserLoggedIn"
            >
                <NButton round tertiary>Categories</NButton>
            </NPopselect>
        </div>
        <form @submit.prevent="searchHandle" class="flex gap-3">
            <NInputGroup>
                <NInput v-model:value="searchString" round placeholder="Search" :disabled="!isUserLoggedIn" />
                <NButton round tertiary @click="searchHandle">
                    <template #icon>
                        <NIcon>
                            <Search />
                        </NIcon>
                    </template>
                    Search
                </NButton>
                <NButton @click="emit('refresh')" round tertiary :disabled="!isUserLoggedIn"> Refresh </NButton>
                <NButton round tertiary @click="emit('refresh')">
                    <template #icon>
                        <NIcon>
                            <Close />
                        </NIcon>
                    </template>
                </NButton>
            </NInputGroup>
        </form>
    </div>
</template>
