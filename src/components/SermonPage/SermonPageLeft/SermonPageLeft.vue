<template>
    <div class="sermon-page-left-side-bar">
        <div class="left-side-content">
            <ul>
                <li>
                    <button>Write Sermon</button>
                </li>
                <li>
                    <button>View Sermons</button>
                </li>
                <li>
                    <button>View My Sermons</button>
                </li>
                <li>
                    <button>What is Sermon?</button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: "SermonPageLeft",
};
</script>
<style lang="scss">
.sermon-page-left-side-bar {
    max-width: 300px;
    width: 100%;
    margin-top: var(--nav-content-gap);
    padding: 0 20px;

    .left-side-content {
        position: fixed;

        ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
        }
    }
}
</style>
