<template>
    <div class="m-20px">
        <div v-for="verse in viewBookChapter" :key="verse.v" class="verse-item" @click="clickVerse(verse)">
            <div class="read-chapter-verse-number">
                {{ verse.v }}
            </div>
            <div v-if="verse.versions" class="w-[100%] max-w-700px text-justify flex flex-col gap-15px">
                <div v-for="version in verse.versions" :key="version.version">
                    <div class="leading-relaxed" :style="`font-size: ${fontSize}px`">
                        <span class="opacity-50 font-500">
                            <i> {{ getVersion(version.version) }}</i>
                        </span>
                        {{ version.text }}
                    </div>
                </div>
            </div>
            <div class="verse-item-more-options">
                <NPopover trigger="hover" :show-arrow="false">
                    <template #trigger>
                        <div class="text-size-30px p-10px bg-gray-600 dark:text-gray-300 text-gray-100 rounded-[100%] cursor-pointer">
                            <i class="bx bx-dots-vertical-rounded"></i>
                        </div>
                    </template>
                    <div>
                        <div class="text-size-18px flex flex-col gap-[10px]">
                            <div class="cursor-pointer flex items-center gap-[7px] opacity-70 hover:opacity-100">
                                <i class="bx bx-bookmark"></i>
                                <span>Bookmark</span>
                            </div>
                            <div class="cursor-pointer flex items-center gap-[7px] opacity-70 hover:opacity-100">
                                <i class="bx bx-share-alt"></i>
                                <span>Share Verse</span>
                            </div>
                        </div>
                    </div>
                </NPopover>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { NPopover } from "naive-ui";


export default defineComponent({
    name: "VersesRender",
    props: ["viewBookChapter", "fontSize"],
    components: { NPopover },
    setup() {
        const store = useStore();
        const bibleStore = computed(() => store.state.bible);
        const getVersion = (table: string) => {
            // eslint-disable-next-line
            let version = bibleStore.value.bibleVersions.filter((item: any) => item.table === table);
            return version ? version[0]?.abbreviation : "NONE";
        };
        return {
            getVersion,
            // eslint-disable-next-line
            clickVerse(verse: any) {
                console.log(verse, )
            }
        };
    },
});
</script>
<style lang="scss">
.verse-item {
    @apply flex items-center justify-between w-[100%] gap-20px mb-20px cursor-default p-20px dark:bg-gray-100 bg-gray-800 dark:bg-opacity-0 bg-opacity-0 dark:hover:bg-opacity-3 hover:bg-opacity-5;

    .read-chapter-verse-number {
        @apply w-[100%] max-w-[60px] flex justify-center items-center text-size-30px font-700 opacity-30 duration-150;
    }

    .verse-item-more-options {
        @apply opacity-0 invisible duration-150;
    }

    &:hover {
        .verse-item-more-options {
            @apply opacity-30 visible;
            &:hover {
                @apply dark:opacity-90 opacity-70;
            }
        }

        .read-chapter-verse-number {
            @apply opacity-100;
        }
    }
}
</style>