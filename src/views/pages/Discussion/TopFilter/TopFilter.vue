<script setup lang="ts">
import { NPopselect, NButton, NIcon, NInput } from "naive-ui";
import { h, ref } from "vue";
import { Search } from "@vicons/carbon";
import discussion_categories from "../discussion_categories";

const categories = discussion_categories;
const selectedCategory = ref<string | null>("all_discussions");
const emit = defineEmits(["refresh"]);

function renderLabel(option: any) {
    return h("span", { class: "flex gap-5px items-center text-size-16px" }, [h(NIcon, { size: 25 }, { default: () => h(option.icon) }), option.label as string]);
}
</script>
<template>
    <div class="flex w-[100%] justify-between">
        <div>
            <NPopselect v-model:value="selectedCategory" trigger="click" :options="categories" :render-label="renderLabel">
                <NButton round tertiary>Categories</NButton>
            </NPopselect>
        </div>
        <div class="flex gap-3">
            <NInput round placeholder="Search">
                <template #prefix>
                    <NIcon>
                        <Search />
                    </NIcon>
                </template>
            </NInput>
            <NButton @click="emit('refresh')" round tertiary> Refresh </NButton>
        </div>
    </div>
</template>
