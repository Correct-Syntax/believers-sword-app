<script lang="ts" setup>
import { useStore } from "vuex";
import { NIcon } from "naive-ui";
import { AddComment } from "@vicons/carbon";

const store = useStore();
const props = defineProps(["verse"]);

const createClipNote = () => {
    let verse = props.verse;
    const BookName = store.state.bible.bibleBooks[verse.b - 1].n;
    verse.bookName = BookName;
    store.state.clipNotes.selectedVerse = verse;
    store.state.clipNotes.createClipNote = true;
};
</script>

<template>
    <div class="verse-item-more-options-item dark:text-gray-300 text-gray-100 cursor-pointer" @click="createClipNote()">
        <NIcon>
            <AddComment />
        </NIcon>
    </div>
</template>
