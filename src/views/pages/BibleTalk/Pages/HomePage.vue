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
                        I just want to let you know that this is where you can access lesson/sermons and other stuff from bibleTalk.com.
                    </div>
                </div>
            </template>
        </NEmpty>
    </div>
</template>
