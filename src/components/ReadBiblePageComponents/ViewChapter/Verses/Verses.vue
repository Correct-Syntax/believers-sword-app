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
    // click outside to close popover
    document.addEventListener("click", function (e) {
        let verseView = document.getElementById("verses-view");
        if (!verseView?.contains(e.target as any)) {
            showPopOver.value = false;
        }
    });
    document.getElementById("verses-view")?.addEventListener("mouseup", (e) => {
        let selection = document.getSelection();
        let selectedText = selection?.toString();

        if (!selectedText) {
            showPopOver.value = false;
        } else {
            xRef.value = e.pageX;
            yRef.value = e.pageY - 20;
        }
    });
    document.getElementById("verses-view")?.addEventListener("mouseup", () => {
        let selection = document.getSelection();
        let selectedText = selection?.toString();

        if (selectedText != "") showPopOver.value = true;
        else showPopOver.value = false;
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

function cancel() {
    showPopOver.value = false;
    if (window.getSelection) {
        window.getSelection()?.removeAllRanges();
    }
}
</script>
<template>
    <div id="verses-view" class="my-20px mx-50px">
        <template v-for="verse in props.viewBookChapter" :key="verse.v">
            <Verse :clipNote="props.clipNotes[`${verse.b}_${verse.c}_${verse.v}`]" :verse="verse" :fontSize="props.fontSize" />
        </template>
    </div>
    <NPopover :show="showPopOver" :x="xRef" :y="yRef" trigger="click">
        <div id="buttons" class="flex items-center gap-10px">
            <HighlighterOptions @setHighlight="showPopOver = false" />
            <NButton size="small" @click="copyText" round strong title="Copy">
                <template #icon>
                    <NIcon>
                        <Copy />
                    </NIcon>
                </template>
                Copy
            </NButton>
            <NButton size="small" @click="cancel" circle strong title="Copy">
                <template #icon>
                    <NIcon>
                        <Close />
                    </NIcon>
                </template>
            </NButton>
        </div>
    </NPopover>
</template>
