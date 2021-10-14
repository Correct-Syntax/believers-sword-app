<template>
    <div id="main-container" class="main-container flex h-[100%] flex-col">
        <n-modal v-model:show="showSettingModal" :on-after-leave="closeModal">
            <n-card style="width: 600px; height: 600px;" :bordered="false" size="small">
                <Settings />
            </n-card>
        </n-modal>
        <div class="w-[100%] pl-40px" :class="{ 'pr-5px': readBibleIsSelected }" style="height: calc(100% - var(--header-height) + 4px)">
            <div class="h-[100%] w-[100%]">
                <div id="main-container-wrapper" class="h-[100%] w-[100%] relative pr-35px" v-show="readBibleIsSelected">
                    <ReadBible />
                </div>
                <div v-if="!readBibleIsSelected" class="h-[100%] w-[100%] relative dark:bg-black dark:bg-opacity-20 bg-gray-200">
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <div class="dark:bg-gray-900 bg-gray-50 px-[7px] py-[2px]">
            <Footer />
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import Footer from "@/components/footer/Footer.vue";
import ReadBible from "./pages/ReadBible.vue";
import { useStore } from "vuex";
import { NModal, NCard } from "naive-ui";
import Settings from "@/components/Settings/Settings.vue";

export default defineComponent({
    name: "MainView",
    components: { Footer, ReadBible, NModal, NCard, Settings },
    setup() {
        const showSettingModal = ref(false);
        const store = useStore();
        const showModalState = computed(() => store.state.showSettings);
        const readBibleIsSelected = computed(() => store.state.readBibleMenuSelected);

        watch(showModalState, (val: boolean) => {
            if (val) showSettingModal.value = val;
        });

        return {
            showSettingModal,
            readBibleIsSelected,
            closeModal: () => {
                store.state.showSettings = false;
            },
        };
    },
});
</script>
<style lang="scss">
#main-container {
    --left-bar-width: 36px;
}
#main-container-wrapper {
    --left-width: 300px;
}
</style>