<script setup lang="ts">
import { highlight, isHighlightable } from "../ReadBiblePageComponents/ViewChapter/TopOptions/Highlighter/HighLight";
import { CircleSolid, Delete } from "@vicons/carbon";
import { NIcon, NButton } from "naive-ui";

const emit = defineEmits(["setHighlight"]);

function highlightSelection(color: string) {
    if (!isHighlightable()) return;
    highlight(color);
    emit("setHighlight", color);
}
</script>
<template>
    <span class="flex whitespace-nowrap text-size-30px gap-7px">
        <button @click="highlightSelection('#FFD26A')" style="color: #ffd26a">
            <NIcon>
                <CircleSolid />
            </NIcon>
        </button>
        <button @click="highlightSelection('lightpink')" style="color: lightpink">
            <NIcon>
                <CircleSolid />
            </NIcon>
        </button>
        <button @click="highlightSelection('lightblue')" style="color: lightblue">
            <NIcon>
                <CircleSolid />
            </NIcon>
        </button>
        <button @click="highlightSelection('#80ED99')" style="color: #80ed99">
            <NIcon>
                <CircleSolid />
            </NIcon>
        </button>
        <button @click="highlightSelection('#C2B8A3')" style="color: #c2b8a3">
            <NIcon>
                <CircleSolid />
            </NIcon>
        </button>
        <NButton size="small" @click="highlightSelection('remove')" round secondary strong>
            <template #icon>
                <NIcon>
                    <Delete />
                </NIcon>
            </template>
            Remove
        </NButton>
    </span>
</template>
