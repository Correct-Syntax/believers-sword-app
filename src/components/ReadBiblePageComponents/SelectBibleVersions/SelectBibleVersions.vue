<template>
    <div class="h-[100%] w-[100%] overflow-y-auto overflowing-div">
        <div class="px-10px">
            <form>
                <template v-for="version in bibleStore.bibleVersions" :key="version.table">
                    <div class="select-none whitespace-nowrap">
                        <NCheckboxGroup v-model:value="selectVersion">
                            <NCheckbox class="cursor-pointer" :value="version.table">
                                <span class="cursor-pointer dark:text-gray-200" :for="version.table">
                                    <span> ({{ version.abbreviation }}) </span>
                                    <span>
                                        {{ version.version }}
                                    </span>
                                </span>
                            </NCheckbox>
                        </NCheckboxGroup>
                    </div>
                </template>
            </form>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import session from "@/service/session";
import { NCheckboxGroup, NCheckbox } from "naive-ui";

export default defineComponent({
    components: { NCheckboxGroup, NCheckbox },
    setup() {
        const store = useStore();
        const bibleStore = computed(() => store.state.bible);
        const selectVersion = ref([]);
        const checkBibleVersion = async () => {
            if (selectVersion.value.length === 0) {
                session.set("storedSelectedVersions", ["t_kjv"]);
                selectVersion.value = session.get("storedSelectedVersions");
            }
            bibleStore.value.bibleVersionsSelected = selectVersion.value;
            session.set("storedSelectedVersions", selectVersion.value);
            await store.dispatch("getBookInChapter", { bible: bibleStore.value.bible, book: bibleStore.value.bookSelected, chapter: bibleStore.value.chapterSelected });
        };

        watch(selectVersion, () => checkBibleVersion());
        onMounted(() => {
            const storedSelectedVersions = session.get("storedSelectedVersions");
            if (storedSelectedVersions) {
                bibleStore.value.bibleVersionsSelected = storedSelectedVersions;
                selectVersion.value = storedSelectedVersions;
            }
        });

        return {
            bibleStore,
            selectVersion,
            checkBibleVersion,
        };
    },
});
</script>
