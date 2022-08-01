<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { NRadioGroup, NRadio, NSpace } from "naive-ui";
import { useStore } from "vuex";
import session from "@/service/session/session";
import { ipcRenderer } from "electron";

const ThemeSelected: any = ref("");
const store = useStore();
const isThemeDark = computed(() => store.state.dark);
const themeOptions = [
    {
        value: "default",
        key: "default",
        label: "Default",
        primaryColorDark: "#68c0fb",
        primaryColorLight: "#43a1df",
    },
    {
        value: "orange",
        key: "orange",
        label: "Orange",
        primaryColorDark: "#ff8f00",
        primaryColorLight: "#ffac41",
    },
    {
        value: "red",
        key: "red",
        label: "Red",
        primaryColorDark: "#e57373",
        primaryColorLight: "#f18280",
    },
    {
        value: "green",
        key: "green",
        label: "Green",
        primaryColorDark: "#66bb6a",
        primaryColorLight: "#36d143",
    },
    {
        value: "purple",
        key: "purple",
        label: "Purple",
        primaryColorDark: "#df78ef",
        primaryColorLight: "#e86dfd",
    },
    {
        value: "pink",
        key: "pink",
        label: "Pink",
        primaryColorDark: "#f17ca3",
        primaryColorLight: "#f773a0",
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

const onSelectTheme = async (theme: string) => {
    let themeOptionSelected = themeOptions.filter((t: any) => t.value === theme)[0];
    let setPrimaryColors = {
        primaryColorDark: themeOptionSelected.primaryColorDark,
        primaryColorLight: themeOptionSelected.primaryColorLight,
    };

    ipcRenderer
        .invoke("changePrimaryTheme", setPrimaryColors)
        .then(() => {
            session.set("primaryColors", setPrimaryColors);
            store.state.primaryColors = setPrimaryColors;
        })
        .catch((e: Error) => console.log(e.message));

    ThemeSelected.value = theme;
};
</script>
<template>
    <div>
        <h1 class="font-700">{{ $t("select_primary_color") }}</h1>
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

<style lang="scss">
.asdf {
    color: rgb(42, 148, 125);
}
</style>
