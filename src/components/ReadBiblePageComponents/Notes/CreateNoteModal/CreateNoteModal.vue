<script lang="ts" setup>
import { ref } from "vue";
import { NModal, NCard, NInput, NButton, NIcon } from "naive-ui";
import { useStore } from "vuex";
import { ipcRenderer } from "electron";
import { Add, Close } from "@vicons/carbon";

const store = useStore();
const showCreateNoteModal = ref(false);
const createNoteTitle = ref(null);
const reset = (): void => {
    createNoteTitle.value = null;
    showCreateNoteModal.value = false;
};

const clickCreateButton = (): void => {
    const key = Date.now();
    const data = {
        key: `key_${key}`,
        content: "",
        title: createNoteTitle.value,
        date: new Date().toDateString(),
    };
    ipcRenderer.send("saveNote", data);
    store.state.notes.selectedNote = data;
    reset();
};
const cancelCreate = (): void => reset();
</script>

<template>
    <div
        class="p-7px m-7px flex rounded-lg justify-center items-center gap-7px text-size-16px cursor-pointer hover:bg-[var(--primaryColor)] dark:bg-gray-800 dark:hover:text-gray-900 bg-gray-100 hover:text-gray-50 duration-300 hover:font-700 whitespace-nowrap select-none"
        @click="showCreateNoteModal = true"
    >
        <NIcon size="20">
            <Add />
        </NIcon>
        <span class="capitalize">{{ $t("create_note") }}</span>
    </div>
    <NModal v-model:show="showCreateNoteModal">
        <NCard style="width: 600px" :bordered="false" size="small">
            <div>
                <h1 class="text-size-20px font-600 mb-10px capitalize">{{ $t("note_title") }}</h1>
                <small class="first-letter:capitalize">{{ $t("create_note_title_note") }}</small>
                <NInput size="large" placeholder="What is the Title of the new Note, can be changed later" v-model:value="createNoteTitle" @keypress.enter="clickCreateButton()" />
                <div class="py-7px flex justify-end gap-10px">
                    <NButton @click="cancelCreate()">
                        <NIcon size="25">
                            <Close />
                        </NIcon>
                        <span class="capitalize">{{ $t("cancel") }}</span>
                    </NButton>
                    <NButton type="primary" :disabled="createNoteTitle === null || createNoteTitle === ''" @click="clickCreateButton()">
                        <NIcon size="25">
                            <Add />
                        </NIcon>
                        <span class="capitalize">{{ $t("create") }}</span>
                    </NButton>
                </div>
            </div>
        </NCard>
    </NModal>
</template>
