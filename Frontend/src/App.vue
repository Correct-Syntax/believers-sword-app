<template>
    <Header />
    <NLayout class="main-page-contents" :native-scrollbar="false">
        <router-view />
    </NLayout>
</template>
<script lang="ts">
import Header from "./components/Header/Header.vue";
import { NLayout } from "naive-ui";
export default {
    components: {
        Header,
        NLayout,
    },
};
</script>
<style lang="scss">
.main-page-contents {
    padding: 80px 0 0 0;
    height: 100vh;
}
</style>
