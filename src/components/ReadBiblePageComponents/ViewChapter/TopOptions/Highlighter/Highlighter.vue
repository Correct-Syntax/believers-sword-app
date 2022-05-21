<script lang="ts" setup>
import { NPopover, NIcon } from "naive-ui";
import { PaintBrush } from "@vicons/carbon";
import HighlightOptionsVue from "@/components/HighlightOptions/HighlightOptions.vue";
</script>

<template>
    <NPopover placement="bottom" trigger="hover">
        <template #trigger>
            <div class="text-size-20px opacity-50 hover:opacity-95 cursor-pointer">
                <NIcon>
                    <PaintBrush />
                </NIcon>
            </div>
        </template>
        <HighlightOptionsVue />
    </NPopover>
</template>
