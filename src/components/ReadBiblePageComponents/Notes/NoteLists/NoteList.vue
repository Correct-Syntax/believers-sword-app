<template>
    <div v-if="Object.keys(currentNote).length > 0" class="note-lists-items">
        <h1>{{currentNote.title}}</h1>
        <p>{{currentNote.date}}</p>
    </div>
    <div v-for="count in noteLists" :key="count" class="note-lists-items">
        <h1>This is a very long text</h1>
        <p>December 2, 2021</p>
    </div>
    <div v-if="Object.keys(noteLists).length < 1 && Object.keys(currentNote).length < 1" class="mt-30px">
        <NEmpty />
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { NEmpty } from "naive-ui";

export default defineComponent({
    components: { NEmpty },
    setup() {
        const store = useStore();
        const noteLists = computed(() => store.state.notes.noteLists);
        const currentNote = computed(() => store.state.notes.currentNote);
        return {
            noteLists,
            currentNote,
        };
    },
});
</script>
<style lang="postcss">
.note-lists-items {
    @apply dark:hover:bg-gray-700 hover:bg-gray-300 p-7px w-[100%] border-l-[5px] border-[var(--primaryColor)] cursor-pointer;
    h1 {
        @apply font-600 text-size-17px max-w-300px truncate;
    }
    p {
        @apply truncate text-size-14px;
    }
}
</style>