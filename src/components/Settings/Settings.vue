<script setup lang="ts">
import { NTabs, NTabPane } from "naive-ui";
import GeneralSettings from "./GeneralSettings/GeneralSettings.vue";
import PersonalizeSettings from "./PersonalizeSettings/PersonalizeSettings.vue";
</script>
<template>
    <div class="h-[100%] p-7px overflow-y-auto relative">
        <NTabs type="card">
            <NTabPane name="generalSettings" tab="General">
                <GeneralSettings />
            </NTabPane>
            <NTabPane name="themeSettings" tab="Personalize">
                <PersonalizeSettings />
            </NTabPane>
        </NTabs>
    </div>
</template>
