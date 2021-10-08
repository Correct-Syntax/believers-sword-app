<template>
    <div class="h-[100%] p-7px">
        <n-tabs type="card">
            <n-tab-pane name="generalSettings" tab="General">
                <div class="px-10px">
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
            </n-tab-pane>
            <n-tab-pane name="themeSettings" tab="Personalize">
                <div>
                    <NAlert type="info" title="Personalize Setting Under Contraction">
                        We are going to add personalize settings where you can change icon, themes, looks, etc. so that it will suit the way you like.
                    </NAlert>
                </div>
            </n-tab-pane>
        </n-tabs>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { NTabs, NTabPane, NSwitch, NAlert } from "naive-ui";
import { useStore } from "vuex";
import session from "@/service/session/session";

export default defineComponent({
    components: { NTabs, NTabPane, NSwitch, NAlert },
    setup() {
        const store = useStore();
        const isDarkTheme = ref(true);
        onMounted(() => {
            isDarkTheme.value = store.state.dark;
        });
        return {
            isDarkTheme,
            handleThemeChange(value: boolean) {
                store.state.dark = value;
                session.set("believers-sword-ui-theme", value ? "dark" : "light");
            },
        };
    },
});
</script>
