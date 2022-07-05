<script setup lang="ts">
import { ipcRenderer } from "electron";
import { NSelect, NIcon, useMessage, NInputNumber } from "naive-ui";
import { ref, watch } from "vue";
import { CopyFile } from "@vicons/carbon";

const search = ref<string | null>(null);
const options = ref<Array<any>>([]);
const isLoading = ref<boolean>(false);
const meanings = ref<Array<any>>([]);
const message = useMessage();
const fontSize = ref(15);

function searchWord(word: string) {
    isLoading.value = true;
    ipcRenderer.invoke("dictionarySearchWord", word).then((data: any) => {
        options.value = data.data.map((item: any) => {
            return {
                label: item.word,
                value: `${item.id}---${item.word}`,
            };
        });
        isLoading.value = false;
    });
}

watch(search, (value: string | null) => {
    if (value) {
        ipcRenderer.invoke("dictionaryGetMeaning", value.split("---")[1]).then((data: any) => {
            meanings.value = data;
        });
    }
    if (!value) {
        meanings.value = [];
    }
});

function copyMeaning(text: string) {
    navigator.clipboard.writeText(text);
    message.success("Copied to clipboard");
}
</script>
<template>
    <div class="p-2 h-[100%] w-[100%]">
        <div class="flex gap-8px h-45px">
            <NSelect v-model:value="search" filterable placeholder="Search a word" :options="options" :loading="isLoading" clearable remote @search="searchWord" />
            <NInputNumber class="max-w-90px" v-model:value="fontSize" min="11" max="20" />
        </div>
        <div class="h-[calc(100%-65px)] pt-10px overflow-y-auto overflowing-div">
            <div class="font-800 text-size-25px pb-10px">{{ search ? search.split("---")[1] : "" }}</div>
            <ul class="flex flex-col gap-10px" :style="`font-size: ${fontSize}px`">
                <li v-for="meaning in meanings" :key="meaning.id">
                    <span class="font-700 mr-3">{{ meaning.wordtype }}</span>
                    <span>{{ meaning.definition }}</span>
                    <span class="hover:text-[var(--primaryColor)] cursor-pointer">
                        <NIcon size="20" @click="copyMeaning(meaning.definition)" title="Copy">
                            <CopyFile />
                        </NIcon>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>
