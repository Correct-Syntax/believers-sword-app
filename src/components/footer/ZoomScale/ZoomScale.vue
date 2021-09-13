<template>
    <div>
        <div class="flex items-center justify-center gap-10px mr-15px">
            <div class="text-size-[12px]">Zoom:</div>
            <div class="w-90px whitespace-nowrap">
                <span class="mr-7px">{{ slideValue }}%</span>
                <NButtonGroup size="small">
                    <NButton size="tiny" @click="slideValue--">
                        <i class='bx bx-minus' ></i>
                    </NButton>
                    <NButton size="tiny">
                        <i class='bx bx-plus' @click="slideValue++"></i>
                    </NButton>
                </NButtonGroup>
            </div>
            <div>
                <NTooltip trigger="hover" placement="top-start">
                    <template #trigger>
                        <div class="cursor-pointer opacity-40 hover:opacity-100" @click="slideValue = 95">
                            <i class="bx bx-reset"></i>
                        </div>
                    </template>
                    Reset Zoom Level
                </NTooltip>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import {  NTooltip, NButtonGroup, NButton } from "naive-ui";
import { useStore } from "vuex";
import session from "@/service/session/session";

export default defineComponent({
    components: {  NTooltip, NButtonGroup, NButton },
    setup() {
        const store = useStore();
        const slideValue = ref(100);

        watch(slideValue, () => {
            slideValue.value = slideValue.value < 95 ? 95 : slideValue.value > 105 ? 105 : slideValue.value;
            store.state.frame.zoomLevel = slideValue.value * 0.01;
            session.set("webFrameZoom", store.state.frame.zoomLevel);
        });

        onMounted(() => {
            let zoomLevel = session.get("webFrameZoom");
            if (zoomLevel) slideValue.value = zoomLevel * 100;
        });

        return {
            slideValue,
        };
    },
});
</script>
