<template>
    <div class="h-[100%] w-[100%]">
        <div class="h-[100%] w-[100%]">
            <n-tabs type="line" size="small">
                <n-tab-pane name="oasis">
                    <template #tab>
                        <span class="pl-5px flex items-center gap-5px">
                            <div>
                                <i class="bx bx-book-open"></i>
                            </div>
                            <span> Versions</span>
                        </span>
                    </template>
                    <SelectBibleVersions />
                </n-tab-pane>
                <n-tab-pane name="the beatles">
                    <template #tab>
                        <span class="flex items-center gap-5px">
                            <div>
                                <i class='bx bx-bookmarks' ></i>
                            </div>
                            <span> Bookmarks</span>
                        </span>
                    </template>
                    Hey Jude
                </n-tab-pane>
                <n-tab-pane name="jay chou">
                    <template #tab>
                        <span class="flex items-center gap-5px">
                            <div>
                                <i class='bx bx-search' ></i>
                            </div>
                            <span> Search</span>
                        </span>
                    </template>
                    this
                </n-tab-pane>
            </n-tabs>
        </div>
    </div>
</template>
<script>
import SelectBibleVersions from "@/components/ReadBiblePageComponents/SelectBibleVersions/SelectBibleVersions.vue";
import { NTabs, NTabPane } from "naive-ui";
export default {
    name: "ReadBibleChapterRightSide",
    components: { SelectBibleVersions, NTabs, NTabPane },
};
</script>