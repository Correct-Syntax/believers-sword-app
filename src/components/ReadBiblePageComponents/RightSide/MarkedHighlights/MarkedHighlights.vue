<template>
    <div class="p-7px">
        <div class="text-size-[18px] mb-7px">
            <h3>Your Highlights:</h3>
        </div>
        <div class="flex flex-col gap-10px">
            <template v-for="highlight in Highlights" :key="highlight.key">
                <div v-if="highlight.key">
                    <span v-html="highlight.content"></span>
                </div>
            </template>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
    setup() {
        const store = useStore();
        const Highlights = computed(() => store.state.marker.highlights);

        return {
            Highlights,
        };
    },
});
</script>
