<script lang="ts" setup>
import { computed } from "vue";
import { NTooltip, NIcon } from "naive-ui";
import { BookmarkAdd } from "@vicons/carbon";
import { ipcRenderer } from "electron";
import { useStore } from "vuex";
import { useMessage } from "naive-ui";
import { cloneDeep } from "lodash";

const store = useStore();
const bookMarkState = computed(() => store.state.verseBookmark.bookmarks);
const message = useMessage();

const saveSelectedBookmark = () => {
    try {
        let selectedVerses = cloneDeep(bookMarkState.value);
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
</script>
<template>
    <NTooltip trigger="hover" size="small">
        <template #trigger>
            <div class="text-size-20px opacity-50 hover:opacity-95 cursor-pointer" @click="saveSelectedBookmark()">
                <NIcon>
                    <BookmarkAdd />
                </NIcon>
            </div>
        </template>
        <span>{{ $t("save_to_bookmark") }}</span>
    </NTooltip>
</template>
