<template>
    <div class="h-[100%] split flex flex-row w-[100%]">
        <div id="prayer-list-main" class="h-[100%] relative">
            <NewPrayerItem />
        </div>
        <div id="prayer-list-side" class="h-[100%] dark:bg-black dark:bg-opacity-30 bg-black bg-opacity-5">prayer list</div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Split from "split.js";

import NewPrayerItem from "./PrayerListPage/CreateNewPrayerItem.vue"
export default defineComponent({
    components: {
        NewPrayerItem
    },
    setup() {
        onMounted(() => {
            Split(["#prayer-list-main", "#prayer-list-side"], {
                sizes: [80, 20],
                maxSize: [Infinity, 500],
                // eslint-disable-next-line
                elementStyle: (dimension, size, gutterSize) => {
                    return {
                        "flex-basis": size + "%",
                    };
                },
            });
        });
    },
});
</script>
