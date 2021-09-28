<template>
    <NButton @click="showModal = true" class="absolute bottom-[20px] right-[20px]">
        <i class="bx bx-plus"></i>
        <span class="ml-5px">Create New Prayer Item</span>
    </NButton>
    <NModal v-model:show="showModal">
        <div class="create-new-prayer-list-editor">
            <div class="mx-10px">
                <div v-if="editor" class="prayer-list-button">
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
                <EditorContent :editor="editor" />
            </div>

            <div class="p-10px flex flex-row justify-end gap-15px">
                <NButton ghost @click="showModal = false">
                    <i class="bx bx-x"></i>
                    Close
                </NButton>
                <NButton type="info" @click="SaveEditorContent()">
                    <i class="bx bx-save"></i>
                    Save
                </NButton>
            </div>
        </div>
    </NModal>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { NButton, NModal } from "naive-ui";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import initialContent from "./initialContent";
import { ipcRenderer } from "electron";

export default defineComponent({
    components: {
        NButton,
        NModal,
        EditorContent,
    },
    setup() {
        const showModal = ref(false);
        const editor = useEditor({
            content: "",
            extensions: [StarterKit, Underline, Placeholder],
        });

        onMounted(() => {
            let initialValue = initialContent;
            editor.value?.commands.setContent(initialValue);
        });
        return {
            showModal,
            editor,
            SaveEditorContent: () => {
                try {
                    const prayerItemContent = editor.value?.getHTML();
                    const date = new Date();
                    ipcRenderer.send("savePrayerListItem", {
                        key: `prayer_item_${Date.now()}`,
                        content: prayerItemContent,
                        date_created: date,
                        date_updated: date,
                    });
                    showModal.value = false;
                    editor.value?.commands.setContent(initialContent);
                } catch (e) {
                    if (e instanceof Error) console.log(e.message);
                }
            },
        };
    },
});
</script>
<style lang="postcss">
.create-new-prayer-list-editor {
    @apply dark:bg-gray-800 bg-gray-200 rounded-md overflow-hidden;

    .prayer-list-button {
        @apply p-10px flex flex-row;

        button {
            @apply p-7px text-size-[20px] rounded-md;

            &:hover {
                @apply dark:bg-gray-700 bg-gray-300;
            }
        }
    }

    .ProseMirror {
        @apply p-10px rounded-md;
    }
}
</style>