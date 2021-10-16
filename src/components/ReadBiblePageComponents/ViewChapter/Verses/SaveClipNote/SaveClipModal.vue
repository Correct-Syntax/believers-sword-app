<template>
    <h1 class="text-size-20px font-700">Clip Note For {{ `${selectedVerse.bookName} ${selectedVerse.c}:${selectedVerse.v}` }}</h1>
    <small>Clip notes, are small notes only for the verse. So that you can emphasize something in the verse.</small>
    <div class="pt-10px mb-15px">
        <h1 class="font-700">Select Clip Color</h1>
        <small>This will be the color of the paper to be clipped in selected verse.</small>
        <div class="pl-20px">
            <NRadioGroup v-model:value="clipColorSelected" size="medium" :on-update:value="onSelectClipColor">
                <NSpace>
                    <NRadio value="default" size="large">
                        <span class="flex items-center">
                            <span class="text-size-20px w-15px h-20px rounded-tl-md rounded-bl-md border border-gray-900" :style="`background-color: white`"></span>
                            <span class="text-size-20px w-15px h-20px rounded-tr-md rounded-br-md border border-gray-900 bg-dark-900"></span>
                        </span>
                    </NRadio>
                    <NRadio v-for="theme in clipColorOptions" :key="theme.key" :value="theme.value" size="large">
                        <span class="flex items-center gap-7px">
                            <span class="text-size-20px w-30px h-20px rounded-md" :style="`background-color: ${theme.color}`"></span>
                        </span>
                    </NRadio>
                </NSpace>
            </NRadioGroup>
        </div>
    </div>
    <div>
        <h1 class="font-700">Clip Note</h1>
        <NAlert v-show="alertShow" size="small" :title="alertText" type="error" />
        <small>This will be the note that will be written on the paper to be clipped on selected verse.</small>
        <div class="pl-20ox">
            <NInput v-model:value="clipNoteInput" type="textarea" placeholder="Write note to be clipped in selected verse." />
        </div>
    </div>
    <div class="pt-15px">
        <NSpace justify="end">
            <NButton size="small" @click="closeModal()">
                Cancel
            </NButton>
            <NButton type="primary" size="small" @click="saveClipNote()">
                Add Clip Note
            </NButton>
        </NSpace>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { NRadioGroup, NSpace, NRadio, NInput, NButton, NAlert } from "naive-ui";
import { useStore } from "vuex";
import { ipcRenderer } from "electron";

export default defineComponent({
    components: {
        NRadioGroup,
        NSpace,
        NRadio,
        NInput,
        NButton,
        NAlert
    },
    setup() {
        const store = useStore();
        const selectedVerse = computed(() => store.state.clipNotes.selectedVerse);
        const clipColorSelected = ref("default");
        const clipNoteInput = ref("");
        const alertShow = ref(false);
        const alertText = ref("");
        const clipColorOptions = [
            {
                value: "#3cb1ff",
                key: "blue",
                label: "Default",
                color: "#3cb1ff"
            },
            {
                value: "#ffb300",
                key: "orange",
                label: "Orange",
                color: "#ffb300"
            },
            {
                value: "#e57373",
                key: "red",
                label: "Red",
                color: "#e57373"
            },
            {
                value: "#63ff63",
                key: "green",
                color: "#63ff63"
            }
        ];

        const closeModal = () => {
            store.state.clipNotes.createClipNote = false;
        };

        return {
            alertShow,
            alertText,
            clipNoteInput,
            selectedVerse,
            clipColorOptions,
            clipColorSelected,
            onSelectClipColor: (e: string) => {
                clipColorSelected.value = e;
            },
            closeModal,
            saveClipNote: () => {
                alertShow.value = false;
                if (clipNoteInput.value === "" && clipNoteInput.value.replace(" ", "") === "") {
                    alertShow.value = true;
                    alertText.value = "It Seems that The note field is empty.";
                    return;
                }

                const dataToAdd = {
                    color: clipColorSelected.value,
                    ...store.state.clipNotes.selectedVerse,
                    note: clipNoteInput.value
                };

                ipcRenderer.invoke("addClipNote", dataToAdd).then(() => {
                    store.state.clipNotes.clipNotesInChapter[`${dataToAdd.b}_${dataToAdd.c}_${dataToAdd.v}`] = dataToAdd;
                    closeModal();
                });
            }
        };
    }
});
</script>
<style lang="scss">
.asdf {
    color: #1d1d1d;
}
</style>
