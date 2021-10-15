<template>
    <div class="pr-7px overflow-y-auto overflowing-div h-500px">
        <NAlert type="info" title="Some Settings Coming Soon">
            Some settings are still in development and will be added here once its done.
        </NAlert>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { NAlert } from "naive-ui";

export default defineComponent({
    components: {
        NAlert
    }
});
</script>
