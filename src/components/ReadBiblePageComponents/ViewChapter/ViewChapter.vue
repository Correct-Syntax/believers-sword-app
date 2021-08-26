<template>
    <div id="view-chapter-component" class="h-[100%]">
        <div class="h-[var(--view-chapter-top-width)]">
            <p>sdfsdf</p>
        </div>
        <div class="view-chapter-verse">
            <div>
                <div class="flex justify-center">
                    <div class="m-20px">
                        <div v-for="verse in bibleStore.viewBookChapter" :key="verse.v" class="verse-item">
                            <div class="w-[100%] max-w-[80px] flex justify-center items-center text-size-30px font-700">
                                {{ verse.v }}
                            </div>
                            <div class="max-w-500px text-justify">
                                {{ verse.t }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
    setup() {
        const store = useStore();
        const bibleStore = computed(() => store.state.bible);

        return {
            bibleStore,
        };
    },
});
</script>
<style lang="scss">
#view-chapter-component {
    --view-chapter-top-width: 40px;
}

.verse-item {
    @apply flex items-center gap-10px mb-20px cursor-default p-20px dark:bg-gray-100 dark:bg-opacity-0 dark:hover:bg-opacity-5;
}

.view-chapter-verse {
    @apply overflow-y-auto dark:bg-black dark:bg-opacity-20 h-[100%];
    height: calc(100% - var(--view-chapter-top-width));
}
</style>