<template>
    <div class="sermon-page-middle-side-bar">
        <div class="sermon-post-wrapper">
            <template v-for="count in [1, 2, 3, 4, 5, 6]" :key="count">
                <PostItem />
            </template>
        </div>
    </div>
</template>
<script lang="ts">
import PostItem from "./PostItem/PostItem.vue";
export default {
    name: "SermonPageMiddle",
    components: { PostItem },
};
</script>
<style lang="scss">
.sermon-page-middle-side-bar {
    border: 1px solid green;
    max-width: 700px;
    width: 100%;

    .sermon-post-wrapper {
        display: flex;
        flex-direction: column;
    }
}
</style>
