import { ipcRenderer } from "electron";
import store from "@/store";

const getSelectionParentElement = () => {
    let parentEl = null,
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

export const highlight = (color: string) => {
    try {
        const selected = window.getSelection();
        const selection = selected?.getRangeAt(0);
        const selectedContent = selection?.extractContents().textContent;
        const span = document.createElement("span");
        span.style.backgroundColor = color;
        if (color != "remove") span.style.color = "#111827";
        if (color != "remove") span.className = "imOnlyOne HasHighlightSpan";
        if (selectedContent) span.textContent = selectedContent;
        if (selection) selection.insertNode(span);

        const selectedParentElement: any = getSelectionParentElement();

        const Children = selectedParentElement.children;
        if (Children.length > 0) {
            for (const elem of Children) {
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
            const parentElem = selectedParentElement;
            const classList = parentElem.classList.value;

            if (classList.includes("HasHighlightSpan")) {
                parentElem.className = "";
                parentElem.style.removeProperty("background-color");
                parentElem.style.removeProperty("color");
            }

            const rootParent = selectedParentElement.parentElement;
            const rootParentClassList = rootParent.classList.value;
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
        if (e instanceof Error) window.message.info("Please Select phrase/words to mark.");
    }
}
