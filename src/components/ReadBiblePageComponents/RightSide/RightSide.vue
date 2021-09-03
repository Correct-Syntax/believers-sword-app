<template>
    <div id="right-side-bar" class="h-[100%] w-[100%]">
        <div class="h-[100%] w-[100%]">
            <n-tabs class=" w-[100%]" style="height: calc(100% - var(--right-side-tab-height))" type="line" size="small">
                <n-tab-pane class="h-[100%]" name="oasis">
                    <template #tab>
                        <span class="pl-5px flex items-center gap-5px select-none">
                            <div>
                                <i class="bx bx-book-open"></i>
                            </div>
                            <span> Versions</span>
                        </span>
                    </template>
                    <SelectBibleVersions />
                </n-tab-pane>
                <n-tab-pane class="h-[100%]" name="the beatles">
                    <template #tab>
                        <span class="flex items-center gap-5px select-none">
                            <div>
                                <i class='bx bx-bookmarks' ></i>
                            </div>
                            <span> Bookmarks</span>
                        </span>
                    </template>
                    <Bookmarks />
                </n-tab-pane>
                <n-tab-pane class="h-[100%]" name="jay chou">
                    <template #tab>
                        <span class="flex items-center gap-5px select-none">
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
import SelectBibleVersions from "./SelectBibleVersions/SelectBibleVersions.vue";
import Bookmarks from "./Bookmarks/Bookmarks.vue"
import { NTabs, NTabPane } from "naive-ui";
export default {
    name: "ReadBibleChapterRightSide",
    components: { SelectBibleVersions, NTabs, NTabPane, Bookmarks },
};
</script>
<style lang="scss">
    #right-side-bar {
        --right-side-tab-height: 40px;
    }
</style>