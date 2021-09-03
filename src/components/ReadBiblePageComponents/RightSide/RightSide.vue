<template>
    <div id="right-side-bar" class="h-[100%] w-[100%]">
        <div class="h-[100%] w-[100%]">
            <n-tabs class=" w-[100%]" style="height: calc(100% - var(--right-side-tab-height))" type="line" size="small" :value="tabValue" :on-update:value="selectTab">
                <n-tab-pane class="h-[100%]" name="versionsTab">
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
                <n-tab-pane class="h-[100%]" name="bookmarksTab">
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
                <n-tab-pane class="h-[100%]" name="searchTab">
                    <template #tab>
                        <span class="pr-5px flex items-center gap-5px select-none">
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
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import SelectBibleVersions from "./SelectBibleVersions/SelectBibleVersions.vue";
import Bookmarks from "./Bookmarks/Bookmarks.vue"
import { NTabs, NTabPane } from "naive-ui";
import session from '@/service/session';
export default defineComponent({
    name: "ReadBibleChapterRightSide",
    components: { SelectBibleVersions, NTabs, NTabPane, Bookmarks },
    setup() {
        const tabValue = ref("versionsTab")

        onMounted(() => {
            tabValue.value = session.get("rightSideSelectedTab") || "versionsTab";
        })

        return {
            tabValue,
            selectTab(e: any) {
                session.set("rightSideSelectedTab", e)
                tabValue.value = e
            }
        }
    }
})
</script>
<style lang="scss">
    #right-side-bar {
        --right-side-tab-height: 40px;
    }
</style>