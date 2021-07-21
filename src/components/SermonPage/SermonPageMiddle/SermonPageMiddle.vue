<template>
    <div class="sermon-page-middle-side-bar">
        <div class="sermon-post-wrapper">
            <template
                v-for="count in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                :key="count"
            >
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
    max-width: 700px;
    width: 100%;
    min-width: 300px;
    margin-top: var(--nav-content-gap);

    .sermon-post-wrapper {
        display: flex;
        flex-direction: column;
        & > * {
            margin: 0 0 20px 0;
        }
    }
}
</style>
