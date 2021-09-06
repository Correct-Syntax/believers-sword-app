<template>
    <div class="h-[100%] flex justify-center items-center">
        <NEmpty description="Sermons Page" size="huge">
            <template #icon>
                <i class='bx bx-traffic-cone'></i>
            </template>
            <template #extra>
                <div class="w-[100%] max-w-[300px]">
                    Hi! This Page is Under Contraction and It will come soon.
                    <div>
                        I just want to let you know that this page, is were you can see or post sermons to share to the community.
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
