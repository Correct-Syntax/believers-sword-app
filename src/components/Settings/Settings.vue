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
<script lang="ts">
import { defineComponent } from "vue";
import { NTabs, NTabPane } from "naive-ui";
import GeneralSettings from "./GeneralSettings/GeneralSettings.vue";
import PersonalizeSettings from "./PersonalizeSettings/PersonalizeSettings.vue";

export default defineComponent({
    components: { NTabs, NTabPane, GeneralSettings, PersonalizeSettings }
});
</script>
