<template>
    <NModal v-model:show="showModal">
        <div class="create-new-prayer-list-editor">
            <div>
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
                </div>
                <EditorContent :editor="editor" />
            </div>

            <div class="p-10px flex flex-row justify-end gap-15px dark:bg-black dark:bg-opacity-10">
                <NPopconfirm @positive-click="showModal = false" placement="bottom-end">
                    <template #trigger>
                        <NButton ghost>
                            <i class="bx bx-x"></i>
                            Close
                        </NButton>
                    </template>
                    Any change will not be saved?
                </NPopconfirm>
                <NButton type="info" @click="SaveEditorContent()">
                    <i class="bx bx-save"></i>
                    Save Changes
                </NButton>
            </div>
        </div>
    </NModal>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { NButton, NModal, NPopconfirm, NPopover } from "naive-ui";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { ipcRenderer } from "electron";

export default defineComponent({
    components: {
        NButton,
        NModal,
        EditorContent,
        NPopconfirm,
        NPopover,
    },
    setup() {
        const keyString = ref("");
        const showModal = ref(false);
        const editor = useEditor({
            content: "",
            extensions: [StarterKit, Underline, Placeholder],
        });

        return {
            keyString,
            setKeyString(key: string) {
                keyString.value = key;
            },
            showModal,
            editor,
            SaveEditorContent: () => {
                try {
                    const prayerItemContent = editor.value?.getHTML();
                    const date = new Date();
                    ipcRenderer.send("editPrayerItem", {
                        key: keyString.value,
                        content: prayerItemContent,
                        date_updated: date,
                    });
                    showModal.value = false;
                    editor.value?.commands.setContent("");
                } catch (e) {
                    if (e instanceof Error) console.log(e.message);
                }
            },
            modalTrigger() {
                showModal.value = !showModal.value;
            },
        };
    },
});
</script>
