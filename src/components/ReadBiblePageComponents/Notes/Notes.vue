<template>
    <div class="split notes-panel h-[100%] flex select-none">
        <div id="create-note-panel-1" class="h-[100%] overflow-y-auto overflowing-div p-5px flex flex-col justify-between">
            <div class="w-[100%] overflow-y-auto overflowing-div flex flex-col gap-10px">
                <NoteList />
            </div>
            <CreateNoteModal />
        </div>
        <div id="create-note-panel-2" class="h-[100%] dark:bg-gray-800 bg-gray-100">
            <div v-show="Object.keys(selectedNote).length > 0" class="h-[100%] flex flex-col">
                <div v-if="editor" class="note-format-buttons flex flex-row items-center justify-between text-size-18px py-5px px-5px dark:bg-black dark:bg-opacity-10">
                    <div class="flex flex-row items-center">
                        <div>
                            <NPopover placement="bottom" trigger="hover">
                                <template #trigger>
                                    <button
                                        class="text-size-20px opacity-50 hover:opacity-95 cursor-pointer flex items-center"
                                        title="Headings"
                                        :class="{
                                            'is-active':
                                                editor.isActive('heading', { level: 1 }) ||
                                                editor.isActive('heading', { level: 2 }) ||
                                                editor.isActive('heading', { level: 3 }) ||
                                                editor.isActive('heading', { level: 4 }) ||
                                                editor.isActive('heading', { level: 5 }) ||
                                                editor.isActive('heading', { level: 6 }),
                                        }"
                                    >
                                        <i class="bx bx-heading -mr-5px"></i>
                                        <i class="bx bx-expand-alt rotate-135 transform !text-size-15px"></i>
                                    </button>
                                </template>
                                <span class="outside-external-note-button flex flex-col whitespace-nowrap text-size-18px">
                                    <button
                                        class="text-size-32px"
                                        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                                        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
                                    >
                                        <i class="bx bx-heading"></i>1
                                    </button>
                                    <button
                                        class="text-size-28px"
                                        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                                        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
                                    >
                                        <i class="bx bx-heading"></i>2
                                    </button>
                                    <button
                                        class="text-size-25px"
                                        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                                        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
                                    >
                                        <i class="bx bx-heading"></i>3
                                    </button>
                                    <button
                                        class="text-size-20px"
                                        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
                                        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
                                    >
                                        <i class="bx bx-heading"></i>4
                                    </button>
                                    <button
                                        class="text-size-18px"
                                        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
                                        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
                                    >
                                        <i class="bx bx-heading"></i>5
                                    </button>
                                    <button
                                        class="text-size-16px"
                                        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
                                        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
                                    >
                                        <i class="bx bx-heading"></i>6
                                    </button>
                                </span>
                            </NPopover>
                        </div>
                        <span class="dark:bg-gray-600 bg-gray-400 w-5px h-5px rounded-md mx-10px rounded-1"></span>
                        <div class="flex flex-row">
                            <button title="Normal Text" @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
                                <i class="bx bx-text"></i>
                            </button>
                            <button title="Bold" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                                <i class="bx bx-bold"></i>
                            </button>
                            <button title="Italic" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
                                <i class="bx bx-italic"></i>
                            </button>
                            <button title="Underline" @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }">
                                <i class="bx bx-underline"></i>
                            </button>
                            <button title="Strike Through" @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
                                <i class="bx bx-strikethrough"></i>
                            </button>
                        </div>
                        <span class="dark:bg-gray-600 bg-gray-400 w-5px h-5px rounded-md mx-10px rounded-1"></span>
                        <div>
                            <button title="Code Text" @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
                                <i class="bx bx-code"></i>
                            </button>
                            <button title="Code Block" @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
                                <i class="bx bx-code-block"></i>
                            </button>
                        </div>
                        <span class="dark:bg-gray-600 bg-gray-400 w-5px h-5px rounded-md mx-10px rounded-1"></span>

                        <div>
                            <button title="Unordered List" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
                                <i class="bx bx-list-ul"></i>
                            </button>
                            <button title="Ordered List" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
                                <i class="bx bx-list-ol"></i>
                            </button>

                            <button title="Quote" @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
                                <i class="bx bxs-quote-left"></i>
                            </button>
                        </div>
                        <span class="dark:bg-gray-600 bg-gray-400 w-5px h-5px rounded-md mx-10px rounded-1"></span>
                        <div>
                            <button title="Undo" @click="editor.chain().focus().undo().run()">
                                <i class="bx bx-undo"></i>
                            </button>
                            <button title="Redo" @click="editor.chain().focus().redo().run()">
                                <i class="bx bx-redo"></i>
                            </button>
                        </div>
                    </div>
                    <NPopconfirm @positive-click="deleteNote()" placement="bottom-end">
                        <template #trigger>
                            <button title="Delete" class="!dark:hover:bg-red-500 !hover:bg-red-600">
                                <i class="bx bx-trash-alt"></i>
                            </button>
                        </template>
                        Are you you want to delete this Note?
                    </NPopconfirm>
                </div>
                <div
                    id="note-title"
                    class="mx-10px mt-10px pb-5px mb-10px min-w-300px text-size-23px border-b-[2px] border-gray-400 font-700"
                    contenteditable="true"
                    placeholder="Enter The Title Here"
                    v-html="selectedNote.title"
                ></div>
                <EditorContent ref="note-editor" class="mx-10px h-[100%] overflow-auto overflowing-div" :editor="editor" />
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
import { NPopconfirm, NPopover } from "naive-ui";

export default defineComponent({
    components: {
        EditorContent,
        CreateNoteModal,
        NoteList,
        NPopconfirm,
        NPopover,
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
            deleteNote: () => {
                ipcRenderer.send("deleteNote", { key: selectedNote.value.key });
                store.state.notes.selectedNote = {};
            },
        };
    },
});
</script>
<style lang="postcss">
.note-format-buttons,
.outside-external-note-button {
    button {
        @apply opacity-75 p-5px rounded-md mx-2px;
        &:hover {
            @apply bg-gray-600 text-gray-50 opacity-100;
        }
    }
    button.is-active {
        @apply bg-gray-600 text-gray-50 opacity-100;
    }
}
.outside-external-note-button {
    button {
        @apply !mx-0px;
    }
}
</style>