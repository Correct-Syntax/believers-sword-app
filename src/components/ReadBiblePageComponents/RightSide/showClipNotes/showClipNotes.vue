<template>
    <div class="flex flex-col p-7px h-[100%] w-[100%] select-none">
        <div class="text-size-[18px] mb-7px">
            <h3>Your Bookmarks:</h3>
            <div class="mt-7px">
                <NAutoComplete :options="options" v-model:value="valueRef" placeholder="Write Book Name To Filter" :on-select="selectOption" :get-show="getShowOptions" />
            </div>
        </div>
        <div class="bookmarks-view-wrapper overflow-y-auto overflowing-div w-[100%]"></div>
        <div class="mt-30px">
            <NEmpty description="No Clip Notes Saved" />
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { NEmpty, NAutoComplete } from "naive-ui";

export default defineComponent({
    components: {
        // NPopconfirm,
        NEmpty,
        NAutoComplete
    },
    setup() {
        const store = useStore();
        const valueRef = ref("");
        const searchBibleBook = ref("all");

        return {
            getShowOptions: () => true,
            valueRef,
            options: computed(() => {
                let newData: any = [
                    {
                        label: "All - Select Book",
                        value: "all"
                    }
                ];
                store.state.bible.bibleBooks.forEach((item: any) => {
                    if (item.n.toLowerCase().includes(valueRef.value.toLowerCase()) || valueRef.value === " " || valueRef.value === "" || valueRef.value === null) {
                        newData.push({
                            label: item.n,
                            value: item.b
                        });
                    }
                });
                return newData;
            }),
            selectOption: (e: string | number) => {
                searchBibleBook.value = e.toString();
            }
        };
    }
});
</script>
