<template>
    <div>
        <h1 class="font-700">Select Primary Color</h1>
        <div class="pl-20px">
            <NRadioGroup v-model:value="ThemeSelected" size="medium" :on-update:value="onSelectTheme">
                <NSpace vertical>
                    <NRadio v-for="theme in themeOptions" :key="theme.key" :value="theme.value" size="large">
                        <span class="flex items-center gap-7px">
                            <span>
                                {{ theme.label }}
                            </span>
                            <span
                                class="text-size-20px w-50px h-20px rounded-md"
                                :style="`background-color: ${isThemeDark ? theme.primaryColorDark : theme.primaryColorLight}`"
                            ></span>
                        </span>
                    </NRadio>
                </NSpace>
            </NRadioGroup>
        </div>
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
                primaryColorLight: "#58a7db"
            },
            {
                value: "orange",
                key: "orange",
                label: "Orange",
                primaryColorDark: "#ff8f00",
                primaryColorLight: "#ffac41"
            },
            {
                value: "red",
                key: "red",
                label: "Red",
                primaryColorDark: "#e57373",
                primaryColorLight: "#f18280"
            },
            {
                value: "green",
                key: "green",
                label: "Green",
                primaryColorDark: "#66bb6a",
                primaryColorLight: "#7ad982"
            },
            {
                value: "purple",
                key: "purple",
                label: "Purple",
                primaryColorDark: "#df78ef",
                primaryColorLight: "#e86dfd"
            },
            {
                value: "pink",
                key: "pink",
                label: "Pink",
                primaryColorDark: "#eb5f8e",
                primaryColorLight: "#fb85ad"
            },
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
<style lang="scss">
    .asdf {
        color: rgb(42, 148, 125);
    }
</style>