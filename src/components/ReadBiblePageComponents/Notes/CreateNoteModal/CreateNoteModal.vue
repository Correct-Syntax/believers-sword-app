<template>
    <div
        class="
            p-7px
            m-7px
            flex
            rounded-lg
            justify-center
            items-center
            gap-7px
            text-size-16px
            cursor-pointer
            hover:bg-[var(--primaryColor)]
            dark:bg-gray-800
            dark:hover:text-gray-900
            hover:text-gray-50
            duration-300
            hover:font-700
            whitespace-nowrap
            select-none
        "
        @click="showCreateNoteModal = true"
    >
        <span class="text-size-20px">
            <i class="bx bx-list-plus"></i>
        </span>
        Create a Note
    </div>
    <NModal v-model:show="showCreateNoteModal">
        <NCard style="width: 600px" :bordered="false" size="small">
            <div>
                <h1 class="text-size-20px font-600 mb-10px">Create Note</h1>
                <small>Write The Title Of Your Note, title can be updated later</small>
                <NInput size="large" placeholder="What is the Title of the new Note, can be changed later" v-model:value="createNoteTitle" />
                <div class="py-7px flex justify-end gap-10px">
                    <NButton @click="cancelCreate()">
                        <div><i class="bx bx-x"></i></div>
                        Cancel</NButton
                    >
                    <NButton type="primary" @click="clickCreateButton()">
                        <div><i class="bx bx-list-plus"></i></div>
                        Create
                    </NButton>
                </div>
            </div>
        </NCard>
    </NModal>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { NModal, NCard, NInput, NButton } from "naive-ui";
import { useStore } from "vuex";

export default defineComponent({
    components: { NModal, NCard, NInput, NButton },
    setup() {
        const store = useStore();
        const showCreateNoteModal = ref(false);
        const createNoteTitle = ref(null);
        const reset = (): void => {
            createNoteTitle.value = null;
            showCreateNoteModal.value = false;
        };
        return {
            showCreateNoteModal,
            createNoteTitle,
            clickCreateButton: (): void => {
                store.state.notes.currentNote.title = createNoteTitle.value;
                store.state.notes.currentNote.date = new Date().toDateString();
                reset();
            },
            cancelCreate: (): void => reset(),
        };
    },
});
</script>
