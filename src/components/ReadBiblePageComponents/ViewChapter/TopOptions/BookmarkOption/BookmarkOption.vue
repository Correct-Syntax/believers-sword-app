<template>
    <NTooltip trigger="hover" size="small">
        <template #trigger>
            <div class="text-size-20px opacity-50 hover:opacity-95 cursor-pointer" @click="saveSelectedBookmark()">
                <i class="bx bx-bookmark-alt-plus"></i>
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
import { useMessage } from "naive-ui";
import _ from "lodash";

export default defineComponent({
    name: "TopBookmarkOption",
    components: { NTooltip },
    setup() {
        const store = useStore();
        const bookMarkState = computed(() => store.state.verseBookmark.bookmarks);
        const message = useMessage();

        const saveSelectedBookmark = () => {
            try {
                let selectedVerses = _.cloneDeep(bookMarkState.value);
                if (selectedVerses.length > 0) {
                    ipcRenderer.invoke("saveVersesInBookmark", selectedVerses).then((bookmarks: any) => {
                        store.dispatch("getVersesInBookmarkResult", bookmarks);
                    });
                    store.state.verseBookmark.bookmarks = [];
                    message.info("Bookmark Saved");
                    return;
                }
            } catch (e) {
                if (e instanceof Error) console.log(e.message);
            }
            message.warning("Please Select Verses To Bookmark.");
        };

        return {
            saveSelectedBookmark,
        };
    },
});
</script>
