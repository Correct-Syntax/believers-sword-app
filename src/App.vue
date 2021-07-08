<template>
    <Header />
    <router-view />
</template>
<script lang="ts">
import Header from "./components/Header/Header.vue";

export default {
    components: {
        Header,
    },
};
</script>
