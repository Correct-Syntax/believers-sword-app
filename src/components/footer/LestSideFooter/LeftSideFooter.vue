<template>
    <div>
        <div class="flex items-center">
            <template v-if="verseBookmarkState.bookmarks.length > 0">
                <div v-for="bookmark in verseBookmarkState.bookmarks" :key="bookmark.v" class="italic">
                    <span class="dark:text-[var(--primaryColor)] text-[var(--primaryColor)]">(</span>
                    {{ bookmark.b }}:{{ bookmark.c }}:{{ bookmark.v }}
                    <span class="text-[var(--primaryColor)]">)</span>
                </div>
                <NButton class="ml-10px flex items-center justify-center" size="tiny" @click="clearBookmarkOnSelect()">
                    <div class="text-size-16px">
                        <i class="bx bx-x"></i>
                    </div>
                    Clear
                </NButton>
            </template>
            <div v-else>😍</div>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { NButton } from "naive-ui";

export default defineComponent({
    components: { NButton },
    setup() {
        const store = useStore();
        const verseBookmarkState = computed(() => store.state.verseBookmark);

        return {
            verseBookmarkState,
            clearBookmarkOnSelect() {
                verseBookmarkState.value.bookmarks = [];
            },
        };
    },
});
</script>
