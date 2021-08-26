<template>
    <div id="view-chapter-component" class="h-[100%]">
        <div class="h-[var(--view-chapter-top-width)]">
            <p>sdfsdf</p>
        </div>
        <div class="view-chapter-verse">
            <pre>
                {{ bibleStore.viewBookChapter }}
            </pre>
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

    .view-chapter-verse {
        @apply overflow-y-auto dark:bg-black dark:bg-opacity-20;
        height: calc(100% - var(--view-chapter-top-width));
    }
</style>