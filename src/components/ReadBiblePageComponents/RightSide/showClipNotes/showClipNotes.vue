<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { NEmpty, NAutoComplete, NPagination, NPopconfirm, NIcon } from "naive-ui";
import { ipcRenderer } from "electron";
import { TrashCan } from "@vicons/carbon";

const store = useStore();
const valueRef = ref("");
const searchBibleBook = ref("all");
const page = ref(1);
const clipNotes: { data: Array<any>; count: number; selected: any; limit: number } = reactive({
    data: [],
    limit: 30,
    selected: {},
    count: 0,
});

const deletedClipNote = computed(() => store.state.clipNotes.deletedClipNote);
const addedClipNote = computed(() => store.state.clipNotes.addedClipNote);

const getClipNotes = () => {
    ipcRenderer
        .invoke("getClipNotes", {
            limit: clipNotes.limit,
            offset: page.value * clipNotes.limit - clipNotes.limit,
            orderBy: "b",
        })
        .then((clipNotesData: any) => {
            clipNotes.data = clipNotesData.data;
            clipNotes.count = clipNotesData.count;
        })
        .catch((e: Error) => console.log(e.message));
};

onMounted(() => {
    getClipNotes();
});

function ObjectLength(object: any | Record<string, unknown>) {
    var length = 0;
    for (var key in object) {
        if (key) {
            ++length;
        }
    }
    return length;
}

watch(page, () => getClipNotes());
watch(deletedClipNote, () => getClipNotes());
watch(addedClipNote, () => getClipNotes());

const deleteClipNote = (clipNote: { b: number | string; c: number | string; v: number | string }) => {
    let verse = {
        b: clipNote.b,
        c: clipNote.c,
        v: clipNote.v,
    };
    ipcRenderer
        .invoke("deleteClipNote", verse)
        .then(() => {
            store.state.clipNotes.deletedClipNote = verse;
            delete store.state.clipNotes.clipNotesInChapter[`${verse.b}_${verse.c}_${verse.v}`];
            if (ObjectLength(clipNotes.data) === 1 && page.value > 0) {
                page.value -= 1;
            }
        })
        .catch((e: Error) => console.log(e.message));
};

const isClipNoteSelected = (verse: { b: number | string; c: number | string; v: number | string }): boolean => {
    const selected: any = clipNotes.selected;
    return selected.b === verse.b && selected.c === verse.c && selected.v === verse.v;
};

const options = computed(() => {
    let newData: any = [
        {
            label: "All - Select Book",
            value: "all",
        },
    ];
    store.state.bible.bibleBooks.forEach((item: any) => {
        if (item.n.toLowerCase().includes(valueRef.value.toLowerCase()) || valueRef.value === " " || valueRef.value === "" || valueRef.value === null) {
            newData.push({
                label: item.n,
                value: item.b,
            });
        }
    });
    return newData;
});

const selectOption = (e: string | number) => {
    searchBibleBook.value = e.toString();
};

const goToVerse = (clipNote: any) => {
    const verse = {
        b: clipNote.b,
        c: clipNote.c,
        v: clipNote.v,
    };

    clipNotes.selected = verse;
    store.state.bible.bookSelected = verse.b;
    store.state.bible.chapterSelected = verse.c;
    store.state.verseBookmark.selectedBookmark = verse;
    store.dispatch("setToggledClipNote", { b: verse.b, c: verse.c });
};

const getShowOptions = () => true;
</script>
<template>
    <div class="flex flex-col p-7px h-[100%] w-[100%] select-none">
        <div class="text-size-[18px] mb-7px">
            <h3 class="font-700">Clipped Notes</h3>
            <div class="mt-15px">
                <NAutoComplete :options="options" v-model:value="valueRef" placeholder="Write Book Name To Filter" :on-select="selectOption" :get-show="getShowOptions" />
            </div>
        </div>
        <div v-if="Object.entries(clipNotes.data).length" class="h-[100%] overflow-y-auto overflowing-div w-[100%] flex flex-col gap-10px text-size-17px leading-snug px-7px">
            <div
                v-for="clipNote in clipNotes.data"
                :key="clipNote.id"
                class="px-7px py-3px rounded-md border-l-4 border-gray-400 border-opacity-0 cursor-pointer text-gray-900 opacity-60 hover:opacity-100 duration-100 relative"
                :class="{
                    'border-l-[var(--primaryColor)] !opacity-100 !rounded-none': isClipNoteSelected(clipNote),
                    'dark:bg-gray-300 bg-gray-700 dark:text-gray-800 text-light-200': clipNote.color === 'default',
                }"
                :style="`background-color: ${clipNote.color}`"
                @click="goToVerse(clipNote)"
            >
                <div class="font-700">{{ `${clipNote.book_name} ${clipNote.c}:${clipNote.v}` }}</div>
                <div v-html="clipNote.note" class="max-h-50px overflow-hidden"></div>
                <NPopconfirm placement="left-end" @positive-click="deleteClipNote(clipNote)">
                    <template #trigger>
                        <span @click.stop.prevent class="absolute right-5px top-5px">
                            <NIcon>
                                <TrashCan />
                            </NIcon>
                        </span>
                    </template>
                    Are Sure Delete This Clip Note?
                </NPopconfirm>
            </div>
        </div>
        <div v-else class="mt-30px">
            <NEmpty description="No Clip Notes Saved" />
        </div>
        <div v-show="clipNotes.count / clipNotes.limit > 1" class="w-[100%] flex flex-col items-end gap-7px">
            <div>Total Verse Result: {{ clipNotes.count }}</div>
            <NPagination v-model:page="page" :page-count="Math.ceil(clipNotes.count / clipNotes.limit)" :page-slot="5" />
        </div>
    </div>
</template>
