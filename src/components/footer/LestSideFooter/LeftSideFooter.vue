<template>
    <div>
        <div class="flex items-center">
            <template v-if="verseBookmarkState.length > 0">
                <div v-for="bookmark in verseBookmarkState" :key="bookmark.v">
                    <span class="text-[var(--darkPrimaryColor)]">(</span>
                    b: {{ bookmark.b }}, c: {{ bookmark.c }}, v: {{ bookmark.v }}
                    <span class="text-[var(--darkPrimaryColor)]">)</span>
                </div>
            </template>
            <div v-else>
                😍
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
        const verseBookmarkState = computed(() => store.state.verseBookmark.bookmarks);

        return {
            verseBookmarkState,
        };
    },
});
</script>
