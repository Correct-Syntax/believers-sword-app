<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import Footer from "@/components/footer/Footer.vue";
import ReadBible from "./pages/ReadBible.vue";
import { useStore } from "vuex";
import { NModal, NCard, useMessage, useNotification } from "naive-ui";
import Settings from "@/components/Settings/Settings.vue";
import SaveClipModal from "@/components/ReadBiblePageComponents/ViewChapter/Verses/SaveClipNote/SaveClipModal.vue";
import Sermons from "@/views/pages/Sermons/Sermons.vue";

const showSettingModal = ref(false);
const store = useStore();
const showModalState = computed(() => store.state.showSettings);
const showUnRoutePage = computed(() => store.state.showUnRoutePage);

watch(showModalState, (val: boolean) => {
    if (val) showSettingModal.value = val;
});

const createClipNoteModal = ref(false);
const isCreateClipNote = computed(() => store.state.clipNotes.createClipNote);
watch(isCreateClipNote, (val: boolean) => {
    createClipNoteModal.value = val;
});

const closeModal = () => {
    store.state.showSettings = false;
    store.state.clipNotes.createClipNote = false;
};

window.message = useMessage();
window.notification = useNotification();
</script>

<template>
    <div id="main-container" class="main-container flex h-[100%] flex-col">
        <NModal v-model:show="showSettingModal" :on-after-leave="closeModal">
            <NCard style="width: 600px; height: 600px" :bordered="false" size="small">
                <Settings />
            </NCard>
        </NModal>
        <NModal v-model:show="createClipNoteModal" :on-after-leave="closeModal">
            <NCard style="width: 600px" :bordered="false" size="small">
                <SaveClipModal />
            </NCard>
        </NModal>
        <div class="w-[100%] pl-40px" :class="{ 'pr-5px': showUnRoutePage == `showBible` }" style="height: calc(100% - var(--header-height) + 4px)">
            <div id="main-container-wrapper" class="h-[100%] w-[100%] relative pr-35px" v-show="showUnRoutePage == `showBible`">
                <ReadBible />
            </div>
            <Sermons v-show="showUnRoutePage == `showSermons`" />
            <div v-if="showUnRoutePage == `false`" class="h-[100%] w-[100%] relative dark:bg-black dark:bg-opacity-20 bg-gray-200">
                <router-view></router-view>
            </div>
        </div>
        <div class="dark:bg-gray-900 bg-gray-50 px-[7px] py-[2px] z-50">
            <Footer />
        </div>
    </div>
</template>

<style lang="scss">
#main-container {
    --left-bar-width: 36px;
}
#main-container-wrapper {
    --left-width: 300px;
}
</style>
