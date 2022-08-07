<script setup lang="ts">
import Axios from "./../../../../service/Axios/Axios";
import { NPopselect, NButton, SelectOption, NIcon, NInput } from "naive-ui";
import { h, onMounted, ref } from "vue";
import { FaceCool, Search } from "@vicons/carbon";

const categories = ref([]);
const selectedCategory = ref<string | null>("all_discussions");
const renderLabel = (option: SelectOption) => {
    if (option.type === "group") return option.label + "(Cool!)";
    return [
        h(
            NIcon,
            {
                style: {
                    verticalAlign: "-0.15em",
                    marginRight: "4px",
                },
            },
            {
                default: () => h(FaceCool),
            }
        ),
        option.label as string,
    ];
};

onMounted(() => {
    Axios.get("/api/v1/categories/all").then(({ data }) => {
        categories.value = data.map((item: { title: string; icon: string; _id: string }) => {
            return {
                label: item.title,
                value: item._id,
            };
        });
    });
});
</script>
<template>
    <div class="flex w-[100%] justify-between">
        <div>
            <NPopselect v-model:value="selectedCategory" :options="categories" :render-label="renderLabel">
                <NButton round tertiary>Categories</NButton>
            </NPopselect>
        </div>
        <div>
            <NInput round placeholder="Search">
                <template #prefix>
                    <NIcon>
                        <Search />
                    </NIcon>
                </template>
            </NInput>
        </div>
    </div>
</template>
