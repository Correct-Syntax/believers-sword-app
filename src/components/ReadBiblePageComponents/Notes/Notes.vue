<template>
    <div class="split h-[100%] flex select-none">
        <div id="create-note-panel-1" class="h-[100%] dark:bg-gray-800 bg-gray-100 overflow-y-auto overflowing-div p-5px flex flex-col justify-between">
            <div class="w-[100%] overflow-y-auto overflowing-div flex flex-col gap-10px">
                <NoteList />
            </div>
            <CreateNoteModal />
        </div>
        <div id="create-note-panel-2" class="h-[100%]">
            <div v-show="Object.keys(selectedNote).length > 0" class="h-[100%] flex flex-col">
                <div v-if="editor" class="note-format-buttons">
                    <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                        <i class="bx bx-bold"></i>
                    </button>
                    <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
                        <i class="bx bx-italic"></i>
                    </button>
                    <button @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }">
                        <i class="bx bx-underline"></i>
                    </button>
                    <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
                        <i class="bx bx-strikethrough"></i>
                    </button>
                    <button @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
                        <i class="bx bx-code"></i>
                    </button>
                    <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
                        <i class="bx bx-paragraph"></i>
                    </button>
                    <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                        <i class="bx bx-heading"></i>1
                    </button>
                    <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                        <i class="bx bx-heading"></i>2
                    </button>
                    <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                        <i class="bx bx-heading"></i>3
                    </button>
                    <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
                        <i class="bx bx-heading"></i>4
                    </button>
                    <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
                        <i class="bx bx-heading"></i>5
                    </button>
                    <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
                        <i class="bx bx-heading"></i>6
                    </button>
                    <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
                        <i class="bx bx-list-ul"></i>
                    </button>
                    <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
                        <i class="bx bx-list-ol"></i>
                    </button>
                    <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
                        <i class="bx bx-code-block"></i>
                    </button>
                    <button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
                        <i class="bx bxs-quote-left"></i>
                    </button>
                    <button @click="editor.chain().focus().undo().run()">
                        <i class="bx bx-undo"></i>
                    </button>
                    <button @click="editor.chain().focus().redo().run()">
                        <i class="bx bx-redo"></i>
                    </button>
                </div>
                <div class="relative mb-20px">
                    <div
                        id="note-title"
                        class="mx-10px pt-30px pb-10px mb-10px min-w-300px text-size-23px border-b-[2px] border-gray-400 font-700"
                        contenteditable="true"
                        placeholder="Write Title Here"
                        v-html="selectedNote.title"
                    ></div>
                    <div class="absolute bottom-[-10px] left-[20px] opacity-50">Write Note Title Here</div>
                </div>
                <editor-content ref="note-editor" class="h-[100%] overflow-auto overflowing-div" :editor="editor" />
            </div>
            <div v-show="Object.keys(selectedNote).length === 0" class="p-10px text-size-[17px] flex items-center gap-3px">
                <span class="text-size-50px text-[var(--primaryColor)]">
                    <i class="bx bxs-left-arrow-alt"></i>
                </span>
                Select a Note To Edit
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { computed, defineComponent, onMounted, watch } from "@vue/runtime-core";
import Split from "split.js";
import Underline from "@tiptap/extension-underline";
import CreateNoteModal from "./CreateNoteModal/CreateNoteModal.vue";
import Placeholder from "@tiptap/extension-placeholder";
import NoteList from "./NoteLists/NoteList.vue";
import { useStore } from "vuex";
import { ipcRenderer } from "electron";

export default defineComponent({
    components: {
        EditorContent,
        CreateNoteModal,
        NoteList,
    },

    setup() {
        const store = useStore();
        const selectedNote = computed(() => store.state.notes.selectedNote);
        const editor = useEditor({
            content: "",
            extensions: [StarterKit, Underline, Placeholder],
            onUpdate({ editor }) {
                const content = editor.getHTML();
                if (selectedNote.value.key && content) {
                    ipcRenderer.send("saveContent", {
                        key: selectedNote.value.key,
                        content: content,
                    });

                    if (store.state.notes.noteLists[selectedNote.value.key + ""]) store.state.notes.noteLists[selectedNote.value.key + ""].content = content;
                }
            },
        });

        watch(selectedNote, () => {
            editor.value?.commands.setContent(selectedNote.value.content != "" ? selectedNote.value.content : "");
        });

        const titleUpdate = async (title: string): Promise<void> => {
            let key = selectedNote.value.key;

            if (title) {
                ipcRenderer.send("saveContent", {
                    key: key,
                    title: title,
                });
            }
        };

        onMounted(() => {
            const sizes: any = localStorage.getItem("create-notes-split-sizes");
            Split(["#create-note-panel-1", "#create-note-panel-2"], {
                sizes: sizes ? JSON.parse(sizes) : [20, 80],
                minSize: [180, 300],
                maxSize: [400, Infinity],
                snapOffset: 0,
                // eslint-disable-next-line
                elementStyle: (dimension, size, gutterSize) => {
                    return {
                        "flex-basis": size + "%",
                    };
                },

                onDragEnd: (sizes) => {
                    localStorage.setItem("create-notes-split-sizes", JSON.stringify(sizes));
                },
            });

            let typingTime: any;
            let noteTitle = document.getElementById("note-title") as Element | HTMLElement | HTMLInputElement;
            noteTitle.addEventListener("keyup", () => {
                clearTimeout(typingTime);
                typingTime = setTimeout(() => {
                    titleUpdate(noteTitle.innerHTML);
                }, 300);
            });

            noteTitle.addEventListener("keydown", (e) => {
                if ((e as KeyboardEvent).key === "Enter" || (e as KeyboardEvent).ctrlKey) e.preventDefault();
                clearTimeout(typingTime);
            });
        });

        return {
            editor,
            selectedNote,
            titleUpdate,
        };
    },
});
</script>
<style lang="postcss">
.note-format-buttons {
    @apply flex flex-wrap gap-10px text-size-20px p-10px dark:bg-gray-900 bg-gray-400;
    button {
        @apply opacity-75;
        &:hover {
            @apply text-gray-50 opacity-100;
        }
    }
}
.ProseMirror {
    @apply h-[100%] p-10px pb-50px;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        @apply !leading-normal m-0;
    }

    h1 {
        @apply text-size-24px font-600;
    }
    h2 {
        @apply text-size-22px font-600;
    }
    h3 {
        @apply text-size-20px font-600;
    }
    h4 {
        @apply text-size-18px font-600;
    }
    h5 {
        @apply text-size-16px font-600;
    }
    h6 {
        @apply text-size-14px font-600;
    }

    p {
        @apply text-size-15px leading-normal;
    }

    ol,
    ul {
        @apply text-size-18px;
    }

    pre {
        @apply text-size-18px dark:bg-dark-900 bg-gray-700 py-10px px-10px dark:text-gray-300 rounded-md font-mono;

        code {
            color: inherit;
            padding: 0;
            background: none;
        }
    }

    blockquote {
        @apply pl-[30px] py-[20px] border-l-[5px] dark:border-gray-100 border-gray-600 dark:bg-light-50 bg-gray-600 dark:bg-opacity-05 bg-opacity-10;
    }

    p.is-editor-empty:first-child::before {
        @apply dark:opacity-30 dark:text-gray-400 text-gray-400;
        content: attr(data-placeholder);
        float: left;
        pointer-events: none;
        height: 0;
    }
}
</style>