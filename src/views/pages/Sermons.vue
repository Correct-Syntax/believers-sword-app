<template>
    <div>
        This is sermon page
        <button @click="tryLang()">Click</button>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { ipcRenderer } from "electron";

export default defineComponent({
    setup() {
        onMounted(() => {
            ipcRenderer.on("resultSent", (event, result) => {
                console.log(result);
            });
        });
        return {
            tryLang: () => {
                ipcRenderer.send("mainWindowLoad");
            },
        };
    },
});
</script>