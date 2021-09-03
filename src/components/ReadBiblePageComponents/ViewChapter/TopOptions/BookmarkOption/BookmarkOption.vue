<template>
    <NTooltip trigger="hover" size="small">
        <template #trigger>
            <div class="text-size-20px opacity-50 hover:opacity-95 cursor-pointer" @click="saveSelectedBookmark()">
                <i class='bx bx-bookmark-alt-plus' ></i>
            </div>
        </template>
        <span>Save to Bookmark</span>
    </NTooltip>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { NTooltip } from "naive-ui";
import { ipcRenderer } from "electron";
import { useStore } from "vuex";
import { useMessage } from 'naive-ui'

export default defineComponent({
    name: "TopBookmarkOption",
    components: { NTooltip },
    setup() {
        const store = useStore();
        const bookMarkState = computed(() => store.state.verseBookmark.bookmarks);
        const bibleBooks = computed(() => store.state.bible.bibleBooks);
        const message = useMessage()

        const saveSelectedBookmark = () => {
            if (bookMarkState.value.length > 0) {
                let newBookMark = [];
                for (let bookmark of bookMarkState.value) {
                    let getBook = bibleBooks.value.filter((book: any) => book.b === bookmark.b)?.[0]?.n;

                    newBookMark.push({
                        b_text: getBook,
                        b: bookmark.b,
                        c: bookmark.c,
                        v: bookmark.v,
                    });
                }
                ipcRenderer.send("saveVersesInBookmark", newBookMark);
                store.state.verseBookmark.bookmarks = [];
                message.info("Bookmark Saved")
                return
            }
            message.warning("Please Select Verses To Bookmark.")
        };

        return {
            saveSelectedBookmark,
        };
    },
});
</script>
