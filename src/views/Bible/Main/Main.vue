<template>
    <div class="flex justify-center px-[10px]">
        <div class="max-w-[600px]">
            <div class="flex relative">
                <div class="sticky">Before</div>
                <div>
                    <div class="mt-4 flex gap-[10px]">
                        <NSelect
                            v-model:value="bookSelected"
                            :options="bookOptions"
                        />
                        <NSelect
                            v-model:value="bookSelected"
                            :options="bookOptions"
                        />
                        <NSelect
                            v-model:value="bookSelected"
                            :options="bookOptions"
                        />
                    </div>
                    <div
                        v-for="count in [
                            1, 2, 4, 5, 6, 6, 7, 8, 9, 12, 14, 15, 16, 17,
                        ]"
                        :key="count"
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Blanditiis nobis, amet reprehenderit est, ab aperiam
                        cupiditate, nesciunt corporis sapiente sunt expedita
                        ratione quae. Ullam optio velit labore totam cumque hic.
                    </div>
                </div>

                <div class="sticky top-[45%] right-0">next</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { NSelect } from "naive-ui";
import { defineComponent, ref } from "vue";
import BooksOption from "./books";
export default defineComponent({
    name: "MeinViewBible",
    components: {
        NSelect,
    },
    setup() {
        const bookSelected = ref(null);
        const bookOptions = BooksOption;
        return {
            bookSelected,
            bookOptions,
        };
    },
});
</script>
