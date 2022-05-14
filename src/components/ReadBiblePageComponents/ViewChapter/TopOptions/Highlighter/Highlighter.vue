<script lang="ts" setup>
import { ref } from "vue";
import { NPopover, useMessage, NIcon } from "naive-ui";
import { ipcRenderer } from "electron";
import store from "@/store";
import { PaintBrush, CircleSolid, CloseOutline } from "@vicons/carbon";

const showPopover = ref(false);
const message = useMessage();

const getSelectionParentElement = () => {
    var parentEl = null,
        sel;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel?.rangeCount) {
            parentEl = sel.getRangeAt(0).commonAncestorContainer;
            if (parentEl.nodeType != 1) {
                parentEl = parentEl.parentNode;
            }
        }
    }

    return parentEl;
};

function highlightSelection(color: string) {
    try {
        let selected = window.getSelection();
        let selection = selected?.getRangeAt(0);
        let selectedContent = selection?.extractContents().textContent;
        let span = document.createElement("span");
        span.style.backgroundColor = color;
        if (color != "remove") span.style.color = "#111827";
        if (color != "remove") span.className = "imOnlyOne HasHighlightSpan";
        if (selectedContent) span.textContent = selectedContent;
        if (selection) selection.insertNode(span);

        const selectedParentElement: any = getSelectionParentElement();

        let Children = selectedParentElement.children;
        if (Children.length > 0) {
            for (let elem of Children) {
                if (elem.textContent === "") elem.remove();
            }
        }

        let key = selectedParentElement.getAttribute("data-key");
        let bibleVersion = selectedParentElement.getAttribute("data-bible-version");
        let bookNumber = selectedParentElement.getAttribute("data-book");
        let chapterNumber = selectedParentElement.getAttribute("data-chapter");
        let verseNumber = selectedParentElement.getAttribute("data-verse");
        let content = selectedParentElement.innerHTML;

        if (color === "remove") {
            let parentElem = selectedParentElement;
            let classList = parentElem.classList.value;

            if (classList.includes("HasHighlightSpan")) {
                parentElem.className = "";
                parentElem.style.removeProperty("background-color");
                parentElem.style.removeProperty("color");
            }

            let rootParent = selectedParentElement.parentElement;
            let rootParentClassList = rootParent.classList.value;
            if (rootParentClassList.includes("verse-select-text cursor-text")) {
                key = rootParent.getAttribute("data-key");
                bibleVersion = rootParent.getAttribute("data-bible-version");
                bookNumber = rootParent.getAttribute("data-book");
                chapterNumber = rootParent.getAttribute("data-chapter");
                verseNumber = rootParent.getAttribute("data-verse");
                content = rootParent.innerHTML;
            }
        }

        ipcRenderer.invoke("saveBibleVerseHighlight", { key, bibleVersion, bookNumber, chapterNumber, verseNumber, content }).then((args: any) => {
            store.dispatch("setHighlights", args);
        });

        // remove all selections
        window.getSelection()?.empty();
    } catch (e) {
        if (e instanceof Error) message.info("Please Select phrase/words to mark.");
    }
}
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
        <span class="flex whitespace-nowrap text-size-30px gap-7px">
            <button
                @click="
                    highlightSelection('#FFD26A');
                    showPopover = false;
                "
                style="color: #ffd26a"
            >
                <NIcon>
                    <CircleSolid />
                </NIcon>
            </button>
            <button
                @click="
                    highlightSelection('lightpink');
                    showPopover = false;
                "
                style="color: lightpink"
            >
                <NIcon>
                    <CircleSolid />
                </NIcon>
            </button>
            <button
                @click="
                    highlightSelection('lightblue');
                    showPopover = false;
                "
                style="color: lightblue"
            >
                <NIcon>
                    <CircleSolid />
                </NIcon>
            </button>
            <button
                @click="
                    highlightSelection('#80ED99');
                    showPopover = false;
                "
                style="color: #80ed99"
            >
                <NIcon>
                    <CircleSolid />
                </NIcon>
            </button>
            <button
                @click="
                    highlightSelection('#C2B8A3');
                    showPopover = false;
                "
                style="color: #c2b8a3"
            >
                <NIcon>
                    <CircleSolid />
                </NIcon>
            </button>
            <button
                @click="
                    highlightSelection('remove');
                    showPopover = false;
                "
            >
                <NIcon>
                    <CloseOutline />
                </NIcon>
            </button>
        </span>
    </NPopover>
</template>
