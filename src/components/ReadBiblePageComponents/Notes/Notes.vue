<template>
    <div class="split h-[100%] flex">
        <div id="create-note-panel-1" class="h-[100%] dark:bg-gray-800 bg-gray-100 overflow-auto overflowing-div">
            <div class="p-7px flex flex-col gap-10px">
                <div>Menu One</div>
                <div>Menu One</div>
            </div>
        </div>
        <div id="create-note-panel-2" class="h-[100%] flex flex-col">
            <div v-if="editor" class="note-format-buttons">
                <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                    <i class="bx bx-bold"></i>
                </button>
                <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
                    <i class="bx bx-italic"></i>
                </button>
                <button @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }">
                    <i class='bx bx-underline'></i>
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
            <editor-content class="h-[100%] overflow-auto overflowing-div" :editor="editor" />
        </div>
    </div>
</template>

<script lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { defineComponent, onMounted } from "@vue/runtime-core";
import Split from "split.js";
import Underline from '@tiptap/extension-underline'

export default defineComponent({
    components: {
        EditorContent,
    },

    setup() {
        const editor = useEditor({
            content: "<p>I’m running tiptap with Vue.js. 🎉</p>",
            extensions: [StarterKit, Underline],
        });

        onMounted(() => {
            const sizes: any = localStorage.getItem("create-notes-split-sizes");
            Split(["#create-note-panel-1", "#create-note-panel-2"], {
                sizes: sizes ? JSON.parse(sizes) : [20, 80],
                minSize: [150, 300],
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
        });

        return { editor };
    },
});
</script>
<style lang="postcss">
.note-format-buttons {
    @apply flex flex-wrap gap-10px text-size-20px p-10px dark:bg-gray-600 bg-gray-400;
    button {
        @apply opacity-75;
        &:hover {
            @apply text-gray-50 opacity-100;
        }
    }
}
.ProseMirror {
    @apply h-[100%] p-10px;
    p {
        @apply text-size-18px;
    }
    ol,
    ul {
        @apply text-size-18px;
    }
    pre {
        @apply text-size-18px dark:bg-dark-900 bg-gray-700 py-10px px-10px dark:text-gray-300;
        color: #fff;
        font-family: "JetBrainsMono", monospace;
        border-radius: 0.5rem;

        code {
            color: inherit;
            padding: 0;
            background: none;
        }
    }

    blockquote {
        @apply pl-[30px] py-[20px] border-l-[5px] dark:border-gray-100 border-gray-600 dark:bg-light-50 bg-gray-600 dark:bg-opacity-05 bg-opacity-10;
    }
}
</style>