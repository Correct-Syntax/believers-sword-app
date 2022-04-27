<template>
    <div id="verses-view" class="my-20px mx-50px select-none">
        <template v-for="verse in viewBookChapter" :key="verse.v">
            <Verse :clipNote="clipNotes[`${verse.b}_${verse.c}_${verse.v}`]" :verse="verse" :fontSize="fontSize" />
        </template>
    </div>
</template>
<script lang="ts">
// import { setVersesUneditable } from "@/helper/VerseHelper/VerseHelper";
import { defineComponent, onMounted } from "vue";
import Verse from "./Verse.vue";

export default defineComponent({
    name: "VersesRender",
    props: ["viewBookChapter", "fontSize", "clipNotes"],
    components: { Verse },
    setup() {
        onMounted(() => {
            // setVersesUneditable(800);
        });
    },
});
</script>
