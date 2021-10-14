<template>
    <div class="pr-7px overflow-y-auto overflowing-div h-500px">
        <SelectTheme />
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import SelectTheme from "./SelectPrimaryTheme.vue"
export default defineComponent({
    components: { SelectTheme },
});
</script>
