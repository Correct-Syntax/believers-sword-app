<template>
    <div class="pr-7px overflow-y-auto overflowing-div h-500px">
        <div class="flex gap-10px mb-20px">
            <div>Enable Dark Theme</div>
            <div>
                <NSwitch v-model:value="isDarkTheme" size="small" @update:value="handleThemeChange" />
            </div>
        </div>
        <NAlert type="info" title="Some Settings Coming Soon">
            Some settings are still in development and will be added here once its done.
        </NAlert>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { NSwitch, NAlert } from "naive-ui";
import { useStore } from "vuex";
import session from "@/service/session/session";

export default defineComponent({
    components: {
        NSwitch,
        NAlert
    },
    setup() {
        const store = useStore()
        const isDarkTheme = ref(true);

        return {
            isDarkTheme,
            handleThemeChange(value: boolean) {
                store.state.dark = value;
                session.set("believers-sword-ui-theme", value ? "dark" : "light");
            },
        }
    }
});
</script>