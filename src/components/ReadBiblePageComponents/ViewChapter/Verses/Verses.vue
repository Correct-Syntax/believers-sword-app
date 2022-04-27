<script lang="ts" setup>
import Verse from "./Verse.vue";

// eslint-disable-next-line
const props = defineProps(["viewBookChapter", "fontSize", "clipNotes"]);


</script>
<template>
    <div id="verses-view" class="my-20px mx-50px select-none">
        <template v-for="verse in props.viewBookChapter" :key="verse.v">
            <Verse :clipNote="props.clipNotes[`${verse.b}_${verse.c}_${verse.v}`]" :verse="verse" :fontSize="props.fontSize" />
        </template>
    </div>
</template>
