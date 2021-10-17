<template>
    <div id="verses-view" class="my-20px mx-50px select-none">
        <template v-for="verse in viewBookChapter" :key="verse.v">
            <Verse :clipNote="clipNotes[`${verse.b}_${verse.c}_${verse.v}`]" :verse="verse" :fontSize="fontSize" />
        </template>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Verse from "./Verse.vue";

export default defineComponent({
    name: "VersesRender",
    props: ["viewBookChapter", "fontSize", "clipNotes"],
    components: { Verse },
    setup() {
        onMounted(() => {
            setTimeout(() => {
                const parentElement = document.getElementById("verses-view");
                parentElement?.querySelectorAll("[contenteditable]").forEach(el => {
                    el.addEventListener("keydown", function(evt: any) {
                        if (evt.code === "KeyC") return true;
                        evt.preventDefault();
                    });
                    el.addEventListener("drop", event => {
                        event.preventDefault();
                    });
                });
            }, 800);
        });
    }
});
</script>