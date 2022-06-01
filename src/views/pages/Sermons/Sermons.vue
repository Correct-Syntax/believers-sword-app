<script lang="ts" setup>
import { NIcon, NTooltip, NButton } from "naive-ui";
import { Information, Reset, Undo } from "@vicons/carbon";
import ShowSermonsLists from "./ShowSermonLists.vue";
import DrawerContentVue from "./partials/DrawerContent/DrawerContent.vue";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

const containerRef = ref<HTMLElement>(null as unknown as HTMLElement);

const store = useStore();
const selectedSermon = computed(() => store.state.sermonState.selected_sermon);
const showSermonsLists = ref();

watch(selectedSermon, () => {
    let ShowSermonContent = document.getElementById("show-sermon-content");
    setTimeout(() => {
        if (ShowSermonContent) ShowSermonContent.scrollTop = 0;
    }, 100);
});

// methods
function getSermons() {
    showSermonsLists.value.getSermons();
}
</script>
<template>
    <div id="drawer-target" class="h-[100%] p-5 overflow-y-auto w-[100%] relative">
        <div v-show="!selectedSermon" class="mb-4 flex items-center justify-between gap-30px sticky">
            <h1 class="text-size-30px font-800 flex items-center gap-10px">
                Sermons
                <NTooltip trigger="hover" placement="bottom">
                    <template #trigger>
                        <NIcon> <Information /> </NIcon>
                    </template>
                    <p class="max-w-300px">
                        This is the sermon page where you can watch and read sermons. Sermons are added by the creator of this app. But you can send a link or a document to my
                        gmail jenuelganawed936@gmail.com. <b>Where going to create a function later to make this work easily.</b>
                    </p>
                </NTooltip>
            </h1>

            <NButton @click="getSermons()" round>
                <NIcon>
                    <Reset />
                </NIcon>
            </NButton>
        </div>
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
            <div :class="{ ' w-[40%] h-[100%] overflow-y-auto overflowing-div pr-4': selectedSermon }">
                <ShowSermonsLists ref="showSermonsLists" />
            </div>
        </div>
    </div>
</template>
