<script lang="ts" setup>
import { ref } from "vue";
import { NButton, NModal, NPopconfirm, NPopover, NIcon } from "naive-ui";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { ipcRenderer } from "electron";
import {
    TextScale,
    ExpandCategories,
    TextFont,
    TextBold,
    TextItalic,
    TextUnderline,
    TextStrikethrough,
    Code,
    List,
    ListNumbered,
    Quotes,
    Undo,
    Redo,
    Close,
    Save,
} from "@vicons/carbon";

const keyString = ref("");
const showModal = ref(false);
const editor: any = useEditor({
    content: "",
    extensions: [StarterKit, Underline, Placeholder],
});

function setKeyString(key: string) {
    keyString.value = key;
}

const SaveEditorContent = () => {
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
};
function modalTrigger() {
    showModal.value = !showModal.value;
}

defineExpose({
    setKeyString,
    modalTrigger,
    editor,
});
</script>

<template>
    <NModal v-model:show="showModal">
        <div class="create-new-prayer-list-editor max-w-90vh">
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
                                        <NIcon>
                                            <TextScale />
                                        </NIcon>
                                        <NIcon class="!text-size-15px">
                                            <ExpandCategories />
                                        </NIcon>
                                    </button>
                                </template>
                                <span class="outside-external-note-button flex flex-col whitespace-nowrap text-size-18px">
                                    <button
                                        class="text-size-32px"
                                        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                                        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
                                    >
                                        H1
                                    </button>
                                    <button
                                        class="text-size-28px"
                                        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                                        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
                                    >
                                        H2
                                    </button>
                                    <button
                                        class="text-size-25px"
                                        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                                        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
                                    >
                                        H3
                                    </button>
                                    <button
                                        class="text-size-20px"
                                        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
                                        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
                                    >
                                        H4
                                    </button>
                                    <button
                                        class="text-size-18px"
                                        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
                                        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
                                    >
                                        H5
                                    </button>
                                    <button
                                        class="text-size-16px"
                                        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
                                        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
                                    >
                                        H6
                                    </button>
                                </span>
                            </NPopover>
                        </div>
                        <span class="dark:bg-gray-600 bg-gray-400 w-5px h-5px rounded-md mx-10px rounded-1"></span>
                        <div class="flex flex-row">
                            <button title="Normal Text" @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
                                <NIcon>
                                    <TextFont />
                                </NIcon>
                            </button>
                            <button title="Bold" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                                <NIcon>
                                    <TextBold />
                                </NIcon>
                            </button>
                            <button title="Italic" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
                                <NIcon>
                                    <TextItalic />
                                </NIcon>
                            </button>
                            <button title="Underline" @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }">
                                <NIcon>
                                    <TextUnderline />
                                </NIcon>
                            </button>
                            <button title="Strike Through" @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
                                <NIcon>
                                    <TextStrikethrough />
                                </NIcon>
                            </button>
                        </div>
                        <span class="dark:bg-gray-600 bg-gray-400 w-5px h-5px rounded-md mx-10px rounded-1"></span>
                        <div>
                            <button title="Code Text" @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">C</button>
                            <button title="Code Block" @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
                                <NIcon>
                                    <Code />
                                </NIcon>
                            </button>
                        </div>
                        <span class="dark:bg-gray-600 bg-gray-400 w-5px h-5px rounded-md mx-10px rounded-1"></span>

                        <div>
                            <button title="Unordered List" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
                                <NIcon>
                                    <List />
                                </NIcon>
                            </button>
                            <button title="Ordered List" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
                                <NIcon>
                                    <ListNumbered />
                                </NIcon>
                            </button>

                            <button title="Quote" @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
                                <NIcon>
                                    <Quotes />
                                </NIcon>
                            </button>
                        </div>
                        <span class="dark:bg-gray-600 bg-gray-400 w-5px h-5px rounded-md mx-10px rounded-1"></span>
                        <div>
                            <button title="Undo" @click="editor.chain().focus().undo().run()">
                                <NIcon>
                                    <Undo />
                                </NIcon>
                            </button>
                            <button title="Redo" @click="editor.chain().focus().redo().run()">
                                <NIcon>
                                    <Redo />
                                </NIcon>
                            </button>
                        </div>
                    </div>
                </div>
                <EditorContent :editor="editor" />
            </div>

            <div class="p-10px flex flex-row justify-end gap-15px dark:bg-black dark:bg-opacity-10">
                <NPopconfirm @positive-click="showModal = false" placement="bottom-end">
                    <template #trigger>
                        <NButton ghost :icon="Close"> Close </NButton>
                    </template>
                    Any change will not be saved?
                </NPopconfirm>
                <NButton type="info" @click="SaveEditorContent()">
                    <NIcon>
                        <Save />
                    </NIcon>
                    Save Changes
                </NButton>
            </div>
        </div>
    </NModal>
</template>
