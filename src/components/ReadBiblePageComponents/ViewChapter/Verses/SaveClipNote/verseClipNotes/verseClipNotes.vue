<template>
    <div v-if="clipNote" class="flex justify-start pl-100px">
        <div
            class="clipNote-Body px-7px py-3px text-gray-900 rounded-bl-md rounded-br-md w-[100%] max-w-700px -mt-[1px] relative flex gap-10px"
            :class="{ 'dark:bg-gray-300 bg-gray-700 dark:text-gray-800 text-light-200': clipNote.color === 'default' }"
            :style="`background-color: ${clipNote.color}`"
        >
            <span>
                <i class="bx bx-note"></i>
            </span>
            <div v-html="clipNote.note"></div>
            <NPopconfirm @positive-click="deleteClipNote()">
                <template #trigger>
                    <span class="trash-button-clipNote absolute left-10px bottom-3px cursor-pointer"><i class="bx bx-trash-alt"></i></span>
                </template>
                Are you sure to delete this Clip Note?
            </NPopconfirm>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { NPopconfirm } from "naive-ui";
import { ipcRenderer } from "electron";
import { useStore } from "vuex";
export default defineComponent({
    components: {
        NPopconfirm
    },
    props: {
        clipNote: { type: [Object, Boolean], default: false }
    },
    setup(props) {
        const store = useStore();
        return {
            deleteClipNote() {
                let verse = {
                    b: typeof props.clipNote === "object" ? props.clipNote.b : false,
                    c: typeof props.clipNote === "object" ? props.clipNote.c : false,
                    v: typeof props.clipNote === "object" ? props.clipNote.v : false
                };
                ipcRenderer
                    .invoke("deleteClipNote", verse)
                    .then(() => {
                        store.state.clipNotes.deletedClipNote = verse;
                        delete store.state.clipNotes.clipNotesInChapter[`${verse.b}_${verse.c}_${verse.v}`];
                    })
                    .catch((e: Error) => console.log(e.message));
            }
        };
    }
});
</script>
