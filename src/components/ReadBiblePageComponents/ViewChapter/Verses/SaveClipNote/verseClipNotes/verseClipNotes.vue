<script lang="ts" setup>
import { NPopconfirm, NIcon, NButton } from "naive-ui";
import { ipcRenderer } from "electron";
import { useStore } from "vuex";
import { DocumentAttachment, Pen, TrashCan } from "@vicons/carbon";

const props = defineProps(["clipNote", "verse"]);
const store = useStore();

function deleteClipNote() {
    let verse = {
        b: typeof props.clipNote === "object" ? props.clipNote.b : false,
        c: typeof props.clipNote === "object" ? props.clipNote.c : false,
        v: typeof props.clipNote === "object" ? props.clipNote.v : false,
    };
    ipcRenderer
        .invoke("deleteClipNote", verse)
        .then(() => {
            store.state.clipNotes.deletedClipNote = verse;
            delete store.state.clipNotes.clipNotesInChapter[`${verse.b}_${verse.c}_${verse.v}`];
        })
        .catch((e: Error) => console.log(e.message));
}
const createClipNote = () => {
    let verse = props.verse;
    const BookName = store.state.bible.bibleBooks[verse.b - 1].n;
    verse.bookName = BookName;
    store.state.clipNotes.selectedVerse = verse;
    store.state.clipNotes.createClipNote = true;
};
</script>

<template>
    <div v-if="clipNote" class="flex justify-start pl-100px">
        <div
            class="px-7px py-3px text-gray-900 rounded-bl-md rounded-br-md w-[100%] max-w-700px -mt-[1px] relative gap-10px"
            :class="{ 'dark:bg-gray-300 bg-gray-700 dark:text-gray-800 text-light-200': clipNote.color === 'default' }"
            :style="`background-color: ${clipNote.color}`"
        >
            <div v-html="clipNote.note"></div>
            <NIcon class="absolute left-[-35px] top-2 dark:text-gray-400" size="29">
                <DocumentAttachment />
            </NIcon>
            <div
                class="flex trash-button-clipNote absolute top-5px flex gap-10px items-center"
                :class="{ 'flex-col right-[-35px] ': clipNote.note.length > 150, 'right-[-70px]': clipNote.note.length < 150 }"
            >
                <NButton secondary size="small" circle class="opacity-70 hover:opacity-100 cursor-pointer" @click="createClipNote()">
                    <NIcon size="20">
                        <Pen />
                    </NIcon>
                </NButton>
                <NPopconfirm @positive-click="deleteClipNote()">
                    <template #trigger>
                        <NButton secondary size="small" circle class="cursor-pointer opacity-70 hover:opacity-100">
                            <NIcon size="20">
                                <TrashCan />
                            </NIcon>
                        </NButton>
                    </template>
                    Are you sure to delete this Clip Note?
                </NPopconfirm>
            </div>
        </div>
    </div>
</template>
