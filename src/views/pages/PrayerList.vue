<template>
    <div class="h-[100%] split flex flex-row w-[100%]">
        <div id="prayer-list-main" class="h-[100%] relative">
            <ShowPrayerList />
        </div>
        <div id="prayer-list-side" class="h-[100%] dark:bg-black dark:bg-opacity-30 bg-black bg-opacity-5 text-center px-30px">
            <NEmpty class="mt-50px"> This is still in development. This will come soon, I just want to let you know that, in here you can see prayer request send by the other people. </NEmpty>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Split from "split.js";
import ShowPrayerList from "./PrayerListPage/ShowPrayerLists.vue";
import { NEmpty } from "naive-ui"
export default defineComponent({
    components: {
        ShowPrayerList,
        NEmpty
    },
    setup() {
        onMounted(() => {
            Split(["#prayer-list-main", "#prayer-list-side"], {
                sizes: [80, 20],
                maxSize: [Infinity, 500],
                elementStyle: (dimension, size) => {
                    return {
                        "flex-basis": size + "%",
                    };
                },
            });
        });
    },
});
</script>
