<template>
    <Header />
    <div class="main-page-contents">
        <router-view />
    </div>
</template>
<script lang="ts">
import Header from "./components/Header/Header.vue";

export default {
    components: {
        Header,
    },
};
</script>
<style lang="scss">
.main-page-contents {
    padding: 80px 0;
}
</style>
