<template>
    <div class="flex justify-center items-center select-none pt-5px">
        <div class="flex items-center gap-20px text-size-13px items-center">
            <div class="flex items-center whitespace-nowrap gap-[10px]">
                <span
                    >Font Size: <span class="dark:bg-gray-200 bg-gray-600 dark:bg-opacity-10 bg-opacity-10 p-3px rounded-md">{{ fontSize }}px</span></span
                >
                <div class="w-130px">
                    <NSlider v-model:value="fontSize" :step="1" :min="13" :max="40" />
                </div>
            </div>
            <div>
                <div>
                    <NTooltip trigger="hover" size="small">
                        <template #trigger>
                            <div class="text-size-20px opacity-50 hover:opacity-95 cursor-pointer">
                                <i class="bx bx-bookmark"></i>
                            </div>
                        </template>
                        <span>Bookmark</span>
                    </NTooltip>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { NSlider, NTooltip } from "naive-ui";
import session from "@/service/session";
import { useStore } from "vuex";

export default defineComponent({
    name: "ViewVerseTopOptions",
    components: {
        NSlider,
        NTooltip,
    },
    setup() {
        const store = useStore();
        const fontSize = ref(14);

        onMounted(() => {
            let viewChapterVersesFontSize = session.get("viewReadChapterFontSize");
            if (viewChapterVersesFontSize) {
                store.state.bible.viewChapterVersesFontSize = viewChapterVersesFontSize;
                fontSize.value = viewChapterVersesFontSize;
            }
        });

        watch(fontSize, () => {
            fontSize.value = fontSize.value < 14 ? 14 : fontSize.value;
            store.state.bible.viewChapterVersesFontSize = fontSize.value;
            session.set("viewReadChapterFontSize", fontSize.value);
        });

        return {
            fontSize,
        };
    },
});
</script>
