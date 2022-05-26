<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
import { getFireStoreSermons } from "@/service/backend/Sermons";
import { LogoYoutube, Document, WifiOff } from "@vicons/carbon";
import { NIcon, NSkeleton, NEmpty } from "naive-ui";

const store = useStore();
const sermons = computed(() => store.state.sermonState.sermons);

const drawerShowContent = ref(false);

const selectASermon = (sermon: any) => {
    store.state.sermonState.selected_sermon = sermon;
};

const loadingSermon = ref(false);

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

defineExpose({
    getSermons,
});
</script>
<template>
    <div>
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
        <NEmpty class="mt-30px" v-show="!isOnline" description="Account Page" size="huge">
            <template #icon>
                <NIcon>
                    <WifiOff />
                </NIcon>
            </template>
            <template #extra>
                <div class="w-[100%] max-w-[300px]">Oops! No Internet Connection. Connect To Internet to Get Show Contents.</div>
            </template>
        </NEmpty>
    </div>
</template>
