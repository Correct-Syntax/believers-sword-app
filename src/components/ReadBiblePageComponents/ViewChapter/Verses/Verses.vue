<script lang="ts" setup>
import HighlighterOptions from "@/components/HighlightOptions/HighlightOptions.vue";
import { onMounted, ref } from "vue";
import Verse from "./Verse.vue";
import { NIcon, NPopover, NButton, useMessage } from "naive-ui";
import { Copy, Close } from "@vicons/carbon";

// eslint-disable-next-line
const props = defineProps(["viewBookChapter", "fontSize", "clipNotes"]);
const showPopOver = ref(false);
const xRef = ref(0);
const yRef = ref(0);
const message = useMessage();

onMounted(() => {
    document.addEventListener("mousedown", (e) => {
        let selection = document.getSelection();
        let selectedText = selection?.toString();

        if (selectedText != "") {
            showPopOver.value = false;
        } else {
            xRef.value = e.pageX + 15;
            yRef.value = e.pageY - 15;
        }
    });
    document.getElementById("verses-view")?.addEventListener("mouseup", () => {
        setTimeout(() => {
            let selection = document.getSelection();
            let selectedText = selection?.toString();

            if (selectedText != "") {
                showPopOver.value = true;
            } else {
                showPopOver.value = false;
            }
        }, 100);
    });
});

const copyText = () => {
    const selected = window.getSelection();
    const text: string | undefined = selected?.toString();
    if (text) {
        navigator.clipboard.writeText(text);
        message.success("Copied to clipboard");
    }
};

const cancel = () => {
    showPopOver.value = false;
    if (window.getSelection) {
        window.getSelection()?.removeAllRanges();
    }
};
</script>
<template>
    <div id="verses-view" class="my-20px mx-50px">
        <template v-for="verse in props.viewBookChapter" :key="verse.v">
            <Verse :clipNote="props.clipNotes[`${verse.b}_${verse.c}_${verse.v}`]" :verse="verse" :fontSize="props.fontSize" />
        </template>
        <NPopover :show="showPopOver" :x="xRef" :y="yRef" trigger="click">
            <div id="buttons" class="flex gap-10px">
                <HighlighterOptions @setHighlight="showPopOver = false" />
                <NButton size="small" @click="copyText" round strong secondary title="Copy">
                    <template #icon>
                        <NIcon>
                            <Copy />
                        </NIcon>
                    </template>
                    Copy
                </NButton>
                <NButton size="small" @click="cancel()" circle strong secondary title="Copy">
                    <template #icon>
                        <NIcon>
                            <Close />
                        </NIcon>
                    </template>
                </NButton>
            </div>
        </NPopover>
    </div>
</template>
