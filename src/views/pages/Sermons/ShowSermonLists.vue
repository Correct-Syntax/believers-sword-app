<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";

import { getFireStoreSermons } from "@/service/backend/Sermons";
import { LogoYoutube, Document, WifiOff } from "@vicons/carbon";
import { NIcon, NSkeleton, NEmpty, NButton } from "naive-ui";
import DrawerContentVue from "./partials/DrawerContent/DrawerContent.vue";
import { Undo } from "@vicons/carbon";

const store = useStore();
const sermons = computed(() => store.state.sermonState.sermons);
const selectedSermon = computed(() => store.state.sermonState.selected_sermon);
const drawerShowContent = ref(false);

const selectASermon = (sermon: any) => {
    store.state.sermonState.selected_sermon = sermon;
};

const loadingSermon = ref(false);

const isOnline = ref(true);

onMounted(() => {
    window.addEventListener("online", () => (isOnline.value = true));
    window.addEventListener("offline", () => (isOnline.value = false));
    /**
     * If a selected value exist on store
     */
    if (store.state.sermonState.selected_sermon) {
        drawerShowContent.value = true;
    }

    if (sermons.value.data && sermons.value.data.length > 0) {
        return;
    }

    getSermons();
});

async function getSermons() {
    try {
        loadingSermon.value = true;
        const errorGetting: any = await getFireStoreSermons()
            .then((result) => {
                store.state.sermonState.sermons = result;
                loadingSermon.value = false;
            })
            .catch((e) => {
                console.log("This is the what");
                console.log(e);
                loadingSermon.value = false;
            });

        if (!errorGetting) {
            isOnline.value = false;
            alert("Oops! No Internet Connection or Error Getting Data. Connect To Internet to Get Show Contents.");
        }
    } catch (e) {
        console.log("Their is an error");
    }
}

defineExpose({
    getSermons,
});
</script>
<template>
    <div class="flex h-[100%] gap-30px">
        <div
            id="show-sermon-content"
            ref="containerRef"
            v-if="selectedSermon"
            :class="{ 'w-[60%] h-[100%] overflow-y-auto overflowing-div scroll-bar-md': selectedSermon }"
            class="relative"
        >
            <NButton class="fixed z-50 top-5px left-170px" round secondary @click="store.state.sermonState.selected_sermon = null">
                <template #icon>
                    <NIcon>
                        <Undo />
                    </NIcon>
                </template>
                Back To Sermon
            </NButton>
            <DrawerContentVue />
        </div>
        <div v-if="isOnline" :class="{ ' w-[40%] h-[100%] overflow-y-auto overflowing-div pr-4': selectedSermon }">
            <div v-show="!loadingSermon && isOnline" class="flex gap-20px flex-wrap">
                <div v-for="sermon in sermons.data" :key="sermon.title" class="w-300px cursor-pointer flex-grow max-w-400px" @click="selectASermon(sermon)">
                    <div class="h-160px rounded-md overflow-hidden">
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
                                <LogoYoutube />
                            </NIcon>
                        </span>
                        <span v-if="sermon.type === 'text'" class="-mb-5px">
                            <NIcon size="20">
                                <Document />
                            </NIcon>
                        </span>
                    </div>
                    <p class="truncate">
                        {{ sermon.description }}
                    </p>
                </div>
            </div>
            <div v-show="loadingSermon && isOnline" class="flex gap-20px mt-3 flex-wrap">
                <div v-for="count in [1, 2, 3, 4, 5, 6, 7, 8]" :key="count" class="w-300px cursor-pointer flex-grow max-w-400px">
                    <NSkeleton class="mb-3 rounded-md" :height="160" />
                    <NSkeleton :height="30" round />
                </div>
            </div>
        </div>
        <div v-else class="text-center w-[100%]">
            <NEmpty class="mt-30px" description="Account Page" size="huge">
                <template #icon>
                    <NIcon>
                        <WifiOff />
                    </NIcon>
                </template>
                <template #extra>
                    <div class="w-[100%] max-w-[300px]">Oops! No Internet Connection or Error Getting Data. Connect To Internet to Get Show Contents.</div>
                </template>
            </NEmpty>
        </div>
    </div>
</template>
