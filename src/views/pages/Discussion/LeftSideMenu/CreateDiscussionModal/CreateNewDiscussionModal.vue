<script setup lang="ts">
import { NModal, NCard, NInput, NPopselect, NButton, NIcon, useMessage } from "naive-ui";
import { computed, h, ref } from "vue";
import Editor from "@/components/Editor/Editor.vue"
import { Add16Filled } from "@vicons/fluent"
import axios from "axios";
import discussion_categories from "../../discussion_categories";

const emit = defineEmits(['close']);
defineProps(['modelValue']);
const EditorValue = ref(null);
const category = ref(null);
const categories = discussion_categories;
function renderLabel(option: any) {
    return h("span", { class: "flex gap-5px items-center text-size-16px" }, [
        h(NIcon, { size: 25 }, { default: () => h(option.icon) }),
        option.label as string
    ])
}

const renderSelectedCategory: any = computed(() => {
    if (category.value) {
        return categories.filter(item => item.value === category.value)[0];
    }
    return false;
})

const message = useMessage();
const title = ref(null);
function submit() {
    if (!title.value || !EditorValue.value || !category.value) {
        message.error("Please fill all fields");
        return;
    }

    const form = {
        "title": title.value,
        "content": EditorValue.value,
        "category": category.value
    }

    axios.post('/api/v1/post/create', form).then((response) => {
        console.log(response)
        title.value = null;
        EditorValue.value = null;
        category.value = null;
    }).catch(e => {
        console.log(e)
    })
}
</script>
<template>
    <NModal :show="modelValue">
        <NCard size="small" class="max-w-900px">
            <div class="flex mb-3 justify-between">
                <NInput v-model:value="title" class="max-w-400px" round placeholder="Add a Title" />
                <NPopselect trigger="click" size="small" v-model:value="category" :options="categories"
                    :render-label="renderLabel" placeholder="Select a Category">
                    <NButton round>
                        <template v-if="category" #icon>
                            <NIcon :component="renderSelectedCategory.icon" />
                        </template>
                        {{ category ? renderSelectedCategory.label : "Select Category" }}
                    </NButton>
                </NPopselect>
            </div>
            <Editor v-model="EditorValue" />
            <div class="flex justify-end gap-10px mt-5">
                <NButton @click="submit" type="primary" round>
                    <template #icon>
                        <NIcon>
                            <Add16Filled />
                        </NIcon>
                    </template>
                    Post New Discussion
                </NButton>
                <NButton @click="emit('close')" round>
                    Close
                </NButton>
            </div>
        </NCard>
    </NModal>
</template>