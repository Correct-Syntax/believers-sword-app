<template>
    <div class="sermon-page-right-side-bar">
        <div class="page-right-bar-content">Add16Regular</div>
    </div>
</template>
<script lang="ts">
export default {
    name: "SermonPageRight",
};
</script>
<style lang="scss">
.sermon-page-right-side-bar {
    max-width: 300px;
    width: 100%;
    border: 1px solid red;
    padding: 0 20px;

    .page-right-bar-content {
        position: fixed;
    }
}
</style>
