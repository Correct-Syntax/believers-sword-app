<template>
    <template v-for="(note, key) in noteLists" :key="note">
        <div class="note-lists-items" :class="{ 'selected-note': selectedNote.key === key }" @click="selectNote(note)">
            <h1 v-html="note.title"></h1>
            <p v-html="note.date"></p>
        </div>
    </template>

    <div v-if="Object.keys(noteLists).length < 1 && Object.keys(selectedNote).length < 1" class="mt-30px">
        <NEmpty />
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { NEmpty } from "naive-ui";
import { ipcRenderer } from "electron";

export default defineComponent({
    components: { NEmpty },
    setup() {
        const store = useStore();
        const noteLists = computed(() => store.state.notes.noteLists);
        const selectedNote = computed(() => store.state.notes.selectedNote);

        onMounted(() => {
            ipcRenderer.on("getNotes", (event, payload) => {
                store.state.notes.noteLists = payload;
            });

            ipcRenderer.send("getNotes");
        });

        return {
            noteLists,
            selectedNote,
            selectNote: (note: any) => {
                store.state.notes.selectedNote = note;
            },
        };
    },
});
</script>
<style lang="postcss">
.note-lists-items {
    @apply dark:hover:bg-gray-700 hover:bg-gray-300 p-7px w-[100%] border-l-[5px] border-gray-800 cursor-pointer;

    &.selected-note {
        @apply border-[var(--primaryColor)];
    }

    h1 {
        @apply font-600 text-size-17px max-w-300px truncate;
    }
    p {
        @apply truncate text-size-14px;
    }
}
</style>