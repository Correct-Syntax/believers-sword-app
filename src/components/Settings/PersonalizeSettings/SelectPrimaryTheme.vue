<template>
    <h1 class="font-700">Select Primary Color</h1>
    <div class="pl-20px">
        <NRadioGroup v-model:value="ThemeSelected" size="medium" :on-update:value="onSelectTheme">
            <NSpace vertical>
                <NRadio v-for="theme in themeOptions" :key="theme.key" :value="theme.value">
                    <span class="flex items-center gap-7px">
                        <span>
                            {{ theme.label }}
                        </span>
                        <span class="text-size-20px w-50px h-20px rounded-md" :style="`background-color: ${isThemeDark ? theme.primaryColorDark : theme.primaryColorLight}`"></span>
                    </span>
                </NRadio>
            </NSpace>
        </NRadioGroup>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { NRadioGroup, NRadio, NSpace } from "naive-ui";
import { useStore } from "vuex";
import session from "@/service/session/session";
import { ipcRenderer } from "electron";
export default defineComponent({
    components: { NRadioGroup, NRadio, NSpace },
    setup() {
        const ThemeSelected: any = ref("");
        const store = useStore();
        const isThemeDark = computed(() => store.state.dark);
        const themeOptions = [
            {
                value: "default",
                key: "default",
                label: "Default",
                primaryColorDark: "#3cb1ff",
                primaryColorLight: "#008fee"
            },
            {
                value: "orange",
                key: "orange",
                label: "Orange",
                primaryColorDark: "#ffb300",
                primaryColorLight: "#ff8f00"
            },
            {
                value: "red",
                key: "red",
                label: "Red",
                primaryColorDark: "#e57373",
                primaryColorLight: "#e53935"
            }
        ];

        onMounted(() => {
            const savedPrimaryColors = session.get("primaryColors");
            if (savedPrimaryColors) {
                ThemeSelected.value = themeOptions.filter(
                    (t: any) => t.primaryColorDark === savedPrimaryColors.primaryColorDark && t.primaryColorLight === savedPrimaryColors.primaryColorLight
                )[0].value;
            }
        });

        return {
            isThemeDark,
            ThemeSelected,
            themeOptions,
            onSelectTheme: async (theme: string) => {
                let themeOptionSelected = themeOptions.filter((t: any) => t.value === theme)[0];
                let setPrimaryColors = {
                    primaryColorDark: themeOptionSelected.primaryColorDark,
                    primaryColorLight: themeOptionSelected.primaryColorLight
                };

                ipcRenderer
                    .invoke("changePrimaryTheme", setPrimaryColors)
                    .then(() => {
                        session.set("primaryColors", setPrimaryColors);
                        store.state.primaryColors = setPrimaryColors;
                    })
                    .catch((e: Error) => console.log(e.message));

                ThemeSelected.value = theme;
            }
        };
    }
});
</script>
