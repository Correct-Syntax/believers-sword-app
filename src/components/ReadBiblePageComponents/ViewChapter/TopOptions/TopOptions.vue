<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { NSlider } from "naive-ui";
import session from "@/service/session/session";
import { useStore } from "vuex";
import BookMarkOption from "@/components/ReadBiblePageComponents/ViewChapter/TopOptions/BookmarkOption/BookmarkOption.vue";
import HighlightOption from "./Highlighter/Highlighter.vue";

const store = useStore();
const fontSize = ref(17);

onMounted(() => {
    let viewChapterVersesFontSize = session.get("viewReadChapterFontSize");
    if (viewChapterVersesFontSize) {
        store.state.bible.viewChapterVersesFontSize = viewChapterVersesFontSize;
        fontSize.value = viewChapterVersesFontSize;
    }

    document.getElementById("view-chapter-verse")?.addEventListener("wheel", function (event: WheelEvent) {
        if (event.ctrlKey) {
            if (event.deltaY) {
                fontSize.value = event.deltaY < 0 ? fontSize.value + 0.5 : fontSize.value - 0.5;
            }
        }
    });
});

watch(fontSize, () => {
    fontSize.value = fontSize.value < 14 ? 14 : fontSize.value;
    store.state.bible.viewChapterVersesFontSize = fontSize.value;
    session.set("viewReadChapterFontSize", fontSize.value);
});
</script>
<template>
    <div class="flex items-center justify-center select-none gap-10px text-size-13px items-center py-5px">
        <div class="flex items-center whitespace-nowrap gap-[10px]">
            <span>
                Font Size: <span class="dark:bg-gray-200 bg-gray-600 dark:bg-opacity-10 bg-opacity-10 p-3px rounded-md">{{ fontSize }}px</span>
            </span>
            <div class="w-130px">
                <NSlider v-model:value="fontSize" :step="1" :min="13" :max="40" />
            </div>
        </div>
        <BookMarkOption />
        <HighlightOption />
    </div>
</template>
