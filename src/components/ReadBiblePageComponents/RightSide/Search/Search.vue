<template>
    <div>
        <div class="px-7px">
            <div class="flex flex-col gap-7px">
                <NInput v-model:value="searchValue" type="text" placeholder="Type To Search" />
                <NSelect v-model:value="searchBibleVersion" :options="bibleVersionsOptions" placeholder="Select The Bible Version" />
                <NSelect v-model:value="searchBibleBook" :options="bibleBookOptions" placeholder="Select Bible Book" />
                <NButton type="primary" @click="clickSubmitSearch()">
                    <div class="flex items-center gap-[10px]">
                        <i class="bx bx-search"></i>
                        <span>Search</span>
                    </div>
                </NButton>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { NInput, NSelect, NButton } from "naive-ui";
import { useStore } from "vuex";

export default defineComponent({
    components: { NInput, NSelect, NButton },
    setup() {
        const store = useStore();
        const searchValue = ref(null);
        const searchBibleVersion = ref("t_kjv");
        const searchBibleBook = ref("all");

        const bibleVersionsOptions = computed(() => {
            let bibleVersions = store.state.bible.bibleVersions;
            let newData: any = [];
            bibleVersions.forEach((item: any) =>
                newData.push({
                    label: `${item.abbreviation} - ${item.version}`,
                    value: item.table,
                })
            );
            return newData;
        });

        const bibleBookOptions = computed(() => {
            let bibleBooks = store.state.bible.bibleBooks;
            let newData: any = [{
                label: "All",
                value: "all"
            }];
            bibleBooks.forEach((item: any) =>
                newData.push({
                    label: item.n,
                    value: item.b,
                })
            );
            return newData;
        });

        const clickSubmitSearch = () => {
            let params = {
                q: searchValue.value,
                bibleVersion: searchBibleVersion.value,
                bibleBook: searchBibleBook.value
            };
            console.log(params)
        }

        return {
            searchValue,
            searchBibleVersion,
            bibleVersionsOptions,
            searchBibleBook,
            bibleBookOptions,
            clickSubmitSearch
        };
    },
});
</script>
