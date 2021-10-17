<template>
    <div class="h-[100%] flex justify-center items-center">
        <NEmpty description="Account Page" size="huge">
            <template #icon>
                <i class='bx bx-traffic-cone'></i>
            </template>
            <template #extra>
                <div class="w-[100%] max-w-[300px]">
                    Hi! This Page is Under Contraction and It will come soon.
                    <div>
                        I just want to let you know that this page, is where you can manage you accounts, Im planning to save your settings on the cloud so that whenever you install this application in other computers. That means your settings, highlights, bookmarks, etc. will be saved.
                    </div>
                </div>
            </template>
        </NEmpty>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { NEmpty } from "naive-ui";

export default defineComponent({
    components: { NEmpty },
});
</script>
