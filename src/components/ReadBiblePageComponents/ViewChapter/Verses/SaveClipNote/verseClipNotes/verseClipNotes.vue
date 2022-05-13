<script lang="ts" setup>
import { NPopconfirm, NIcon } from "naive-ui";
import { ipcRenderer } from "electron";
import { useStore } from "vuex";
import { AddComment, Pen, TrashCan } from "@vicons/carbon";

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
            class="clipNote-Body px-7px py-3px text-gray-900 rounded-bl-md rounded-br-md w-[100%] max-w-700px -mt-[1px] relative flex gap-10px pb-30px"
            :class="{ 'dark:bg-gray-300 bg-gray-700 dark:text-gray-800 text-light-200': clipNote.color === 'default' }"
            :style="`background-color: ${clipNote.color}`"
        >
            <span>
                <NIcon>
                    <AddComment />
                </NIcon>
            </span>
            <div v-html="clipNote.note"></div>
            <div class="trash-button-clipNote absolute right-5px bottom-2px flex gap-10px items-center">
                <span class="opacity-70 hover:opacity-100 cursor-pointer" @click="createClipNote()">
                    <NIcon>
                        <Pen />
                    </NIcon>
                </span>
                <NPopconfirm @positive-click="deleteClipNote()">
                    <template #trigger>
                        <span class="cursor-pointer opacity-70 hover:opacity-100">
                            <NIcon>
                                <TrashCan />
                            </NIcon>
                        </span>
                    </template>
                    Are you sure to delete this Clip Note?
                </NPopconfirm>
            </div>
        </div>
    </div>
</template>
