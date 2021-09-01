<template>
    <div>
        <div class="flex justify-between whitespace-nowrap items-center">
            <div class="select-none w-350px">
                <LeftSideFooter />
            </div>
            <div class="w-350px flex justify-center items-center gap-10px dark:text-[var(--darkPrimaryColor)] text-[var(--lightPrimaryColor)]">
                <div>{{ bibleBook(bibleStore.bookSelected) }}</div>
                <div>{{ bibleStore.chapterSelected }}</div>
            </div>
            <div class="select-none w-350px flex justify-end">
                <div>
                    <div class="flex items-center gap-10px mr-15px">
                        <div>Zoom:</div>
                        <div class="w-90px">
                            <NInputNumber v-model:value="slideValue" :max="110" :min="80" size="small" :step="2" />
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
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { NInputNumber, NTooltip } from "naive-ui";
import session from "@/service/session";
import LeftSideFooter from "@/components/footer/LestSideFooter/LeftSideFooter.vue";
export default defineComponent({
    name: "MainView",
    components: { NInputNumber, NTooltip, LeftSideFooter },
    setup() {
        const store = useStore();
        const bibleStore = computed(() => store.state.bible);
        const slideValue = ref(100);

        watch(slideValue, () => {
            slideValue.value = slideValue.value < 80 ? 80 : slideValue.value > 110 ? 110 : slideValue.value;
            store.state.frame.zoomLevel = slideValue.value * 0.01;
            session.set("webFrameZoom", store.state.frame.zoomLevel);
        });

        onMounted(() => {
            let zoomLevel = session.get("webFrameZoom");
            if (zoomLevel) slideValue.value = zoomLevel * 100;
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