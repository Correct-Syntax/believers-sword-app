<template>
    <div>
        <div class="flex justify-between whitespace-nowrap">
            <div>left side</div>
            <div class="flex justify-center items-center gap-10px">
                <div>{{ bibleBook(bibleStore.bookSelected) }}</div>
                <div>{{ bibleStore.chapterSelected }}</div>
            </div>
            <div>
                <div>
                    <div class="flex items-center gap-10px mr-15px">
                        <div>Zoom:</div>
                        <div class="w-200px">
                            <NSlider v-model:value="slideValue" :max="110" :min="80" :step="0.1" />
                        </div>
                        <div>
                            <NTooltip trigger="hover" placement="top-start">
                                <template #trigger>
                                    <div class="cursor-pointer opacity-40 hover:opacity-100" @click="slideValue = 100">
                                        <i class="bx bx-reset"></i>
                                    </div>
                                </template>
                                Reset Zoom Level
                            </NTooltip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import { NSlider, NTooltip } from "naive-ui";
export default defineComponent({
    name: "MainView",
    components: { NSlider, NTooltip },
    setup() {
        const store = useStore();
        const bibleStore = computed(() => store.state.bible);
        const slideValue = ref(100);

        watch(slideValue, () => {
            store.state.frame.zoomLevel = slideValue.value * 0.01;
        });

        return {
            bibleStore,
            bibleBook: (number: number) => {
                let books = bibleStore.value.bibleBooks;
                return books.filter((item: null | { b: number }) => item?.b == number)[0]?.n;
            },
            slideValue,
        };
    },
});
</script>