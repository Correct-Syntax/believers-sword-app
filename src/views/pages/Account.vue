<script lang="ts" setup>
import { NEmpty, NIcon } from "naive-ui";
import { TrafficCone } from "@vicons/carbon";
</script>

<template>
    <div class="h-[100%] flex justify-center items-center">
        <NEmpty description="Account Page" size="huge">
            <template #icon>
                <NIcon>
                    <TrafficCone />
                </NIcon>
            </template>
            <template #extra>
                <div class="w-[100%] max-w-[300px]">
                    Hi! This Page is Under Contraction and It will come soon.
                    <div>
                        I just want to let you know that this page, is where you can manage you accounts, Im planning to save your settings on the cloud so that whenever you
                        install this application in other computers. That means your settings, highlights, bookmarks, etc. will be saved.
                    </div>
                </div>
            </template>
        </NEmpty>
    </div>
</template>
