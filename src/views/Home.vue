<template>
    <div class="home">
        <h3>{{ GET_NUMBER }}</h3>
        <button @click="increment()">Increase</button>
    </div>
</template>
<script lang="ts">
import { mapGetters, useStore } from "vuex";

export default {
    name: "Home",
    setup() {
        const store = useStore();
        return {
            increment: () => store.state.number++,
        };
    },
    computed: {
        ...mapGetters(["GET_NUMBER"]),
    },
};
</script>
