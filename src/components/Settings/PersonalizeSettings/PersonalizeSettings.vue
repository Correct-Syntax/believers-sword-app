<template>
    <div class="pr-7px overflow-y-auto overflowing-div h-500px flex flex-col gap-15px">
        <ChangeTheme />
        <SelectTheme />
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import SelectTheme from "./SelectPrimaryTheme/SelectPrimaryTheme.vue"
import ChangeTheme from "./ChangeTheme/ChangeTheme.vue"
export default defineComponent({
    components: { SelectTheme, ChangeTheme },
});
</script>
