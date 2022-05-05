<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
import { getFireStoreSermons } from "@/service/FireBase/common/Sermons";
import { DrawerPlacement, NDrawer, NDrawerContent, NInput, NIcon, NSelect, NTooltip, NButton } from "naive-ui";
import { Search24Filled, DocumentBulletList20Regular, Info16Regular, ArrowReset24Filled } from "@vicons/fluent";
import categoryOptions from "./CategoryOptions";
import { Youtube, WindowClose } from "@vicons/fa";
import DrawerContentVue from "./partials/DrawerContent/DrawerContent.vue";
import { NScrollbar } from "naive-ui";

const store = useStore();
const sermons = computed(() => store.state.sermonState.sermons);
const sermonTitleSelected = () => computed(() => (store.state.sermonState.selected_sermon ? store.state.sermonState.selected_sermon.title : "No Title"));

const drawerShowContent = ref(false);
const placement = ref<DrawerPlacement>("right");

const selectASermon = (sermon: any) => {
    store.state.sermonState.selected_sermon = sermon;
    drawerShowContent.value = true;
};
const closeSelectedSermon = () => {
    store.state.sermonState.selected_sermon = null;
    drawerShowContent.value = false;
};

const loadingSermon = ref(false);
const categorySelected = ref(null);

function getSermons() {
    loadingSermon.value = true;
    getFireStoreSermons()
        .then((result) => {
            store.state.sermonState.sermons = result;
            loadingSermon.value = false;
        })
        .catch((e) => {
            console.log(e);
            loadingSermon.value = false;
        });
}

onMounted(() => {
    /**
     * If a selected value exist on store
     */
    if (store.state.sermonState.selected_sermon) {
        drawerShowContent.value = true;
    }

    if (sermons.value.length > 0) {
        return;
    }

    getSermons();
});
</script>
<template>
    <div id="drawer-target" class="h-[100%] p-5">
        <NDrawer v-model:show="drawerShowContent" :width="`100%`" :placement="placement" to="#drawer-target">
            <NDrawerContent>
                <template #header>
                    <div class="flex gap-10px">
                        <div @click="closeSelectedSermon">
                            <NIcon class="cursor-pointer">
                                <WindowClose />
                            </NIcon>
                        </div>
                        <div>{{ sermonTitleSelected() }}</div>
                    </div>
                </template>
                <NScrollbar class="h-[100%]">
                    <DrawerContentVue />
                </NScrollbar>
            </NDrawerContent>
        </NDrawer>
        <div class="mb-4 flex items-center gap-30px">
            <h1 class="text-size-30px font-800 flex items-center gap-10px">
                Sermons

                <NTooltip trigger="hover" placement="bottom">
                    <template #trigger>
                        <NIcon> <Info16Regular /> </NIcon>
                    </template>
                    <p class="max-w-300px">
                        This is the sermon page where you can watch and read sermons. Sermons are added by the creator of this app. But you can send a link or a document to my
                        gmail jenuelganawed936@gmail.com. <b>Where going to create a function later to make this work easily.</b>
                    </p>
                </NTooltip>
            </h1>
            <NInput round placeholder="Flash">
                <template #suffix>
                    <NIcon><Search24Filled /></NIcon>
                </template>
            </NInput>
            <div class="max-w-300px w-[100%]">
                <NSelect v-model:value="categorySelected" :options="categoryOptions" />
            </div>
            <NButton @click="getSermons()" :loading="loadingSermon" round>
                <NIcon>
                    <ArrowReset24Filled />
                </NIcon>
            </NButton>
        </div>
        <div class="flex gap-20px mt-3 flex-wrap">
            <div v-for="sermon in sermons" :key="sermon.title" class="w-300px cursor-pointer flex-grow" @click="selectASermon(sermon)">
                <div class="h-160px overflow-hidden">
                    <img v-if="sermon.thumbnail" :src="sermon.thumbnail" alt="" class="w-[100%]" />
                    <div v-else class="w-[100%] bg-black h-160px flex justify-center items-center p-10px overflow-auto">
                        <h1 class="font-800 text-size-30px">{{ sermon.title }}</h1>
                    </div>
                </div>

                <div class="font-700 flex gap-10px mt-10px">
                    <p class="truncate">
                        {{ sermon.title }}
                    </p>
                    <span v-if="sermon.type === 'youtube'" class="-mb-5px">
                        <NIcon size="20" color="#FF0000">
                            <Youtube />
                        </NIcon>
                    </span>
                    <span v-if="sermon.type === 'text'" class="-mb-5px">
                        <NIcon size="20">
                            <DocumentBulletList20Regular />
                        </NIcon>
                    </span>
                </div>
                <p class="truncate">
                    {{ sermon.description }}
                </p>
            </div>
        </div>
    </div>
</template>
