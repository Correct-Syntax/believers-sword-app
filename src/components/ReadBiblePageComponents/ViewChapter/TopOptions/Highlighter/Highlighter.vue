<template>
    <div class="flex gap-[10px]">
        <div>
            <NPopover placement="bottom" trigger="hover">
                <template #trigger>
                    <div class="text-size-20px opacity-50 hover:opacity-95 cursor-pointer">
                        <i class='bx bx-highlight'></i>
                    </div>
                </template>
                <span class="flex whitespace-nowrap text-size-30px gap-7px">
                    <button
                        @click="
                            highlightSelection('#FFD26A');
                            showPopover = false;
                        "
                        style="color: yellow"
                    >
                        <i class="bx bxs-square-rounded"></i>
                    </button>
                    <button
                        @click="
                            highlightSelection('lightpink');
                            showPopover = false;
                        "
                        style="color: lightpink"
                    >
                        <i class="bx bxs-square-rounded"></i>
                    </button>
                    <button
                        @click="
                            highlightSelection('lightblue');
                            showPopover = false;
                        "
                        style="color: lightblue"
                    >
                        <i class="bx bxs-square-rounded"></i>
                    </button>
                    <button
                        @click="
                            highlightSelection('#80ED99');
                            showPopover = false;
                        "
                        style="color: #80ed99"
                    >
                        <i class="bx bxs-square-rounded"></i>
                    </button>
                    <button
                        @click="
                            highlightSelection('#C2B8A3');
                            showPopover = false;
                        "
                        style="color: #c2b8a3"
                    >
                        <i class="bx bxs-square-rounded"></i>
                    </button>
                    <button
                        @click="
                            highlightSelection('remove');
                            showPopover = false;
                        "
                    >
                        <i class="bx bxs-x-square"></i>
                    </button>
                </span>
            </NPopover>
        </div>
        <!-- <div>
            <NTooltip trigger="hover" size="small">
                <template #trigger>
                    <div class="text-size-20px opacity-50 hover:opacity-95 cursor-pointer" @click="highlightSelection('remove')">
                        <i class="bx bxs-x-square"></i>
                    </div>
                </template>
                <span>Remove Mark</span>
            </NTooltip>
        </div> -->
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { NPopover, useMessage } from "naive-ui";
import { ipcRenderer } from "electron";

export default defineComponent({
    components: { NPopover },
    setup() {
        const showPopover = ref(false);
        const message = useMessage();

        function getSelectionParentElement() {
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
        }

        return {
            showPopover,
            highlightSelection(color: string) {
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

                    let set: any = getSelectionParentElement();
                    set.children.forEach((elem: any) => {
                        if (elem.textContent === "") elem.remove();
                    });

                    let key = set.getAttribute("data-key");
                    let bibleVersion = set.getAttribute("data-bible-version");
                    let bookNumber = set.getAttribute("data-book");
                    let chapterNumber = set.getAttribute("data-chapter");
                    let verseNumber = set.getAttribute("data-verse");
                    let content = set.innerHTML;

                    ipcRenderer.send("saveBibleVerseHighlight", { key, bibleVersion, bookNumber, chapterNumber, verseNumber, content });

                    // remove all selections
                    window.getSelection()?.empty();
                } catch (e: any) {
                    message.info(e.message);
                }
            },
        };
    },
});
</script>