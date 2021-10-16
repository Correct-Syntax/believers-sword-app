<template>
    <div class="verse-item-more-options-item  dark:text-gray-300 text-gray-100 cursor-pointer" @click="createClipNote()">
        <i class="bx bx-note"></i>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
    props: ["verse"],
    setup(props) {
        const store = useStore();
        return {
            createClipNote: () => {
                let verse = props.verse;
                const BookName = store.state.bible.bibleBooks[verse.b - 1].n;
                verse.bookName = BookName;
                store.state.clipNotes.selectedVerse = verse;
                store.state.clipNotes.createClipNote = true;
            }
        };
    }
});
</script>
