<template>
    <div class="h-[100%] w-[100%] p-7px">
        <SelectBibleVersions />
    </div>
</template>
<script>
import SelectBibleVersions from "@/components/ReadBiblePageComponents/SelectBibleVersions/SelectBibleVersions.vue";
export default {
    name: "ReadBibleChapterRightSide",
    components: { SelectBibleVersions },
};
</script>