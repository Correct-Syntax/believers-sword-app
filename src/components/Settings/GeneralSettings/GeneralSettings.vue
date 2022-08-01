<script lang="ts" setup>
import { NAlert, NSelect } from "naive-ui";
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import session from "./../../../service/session/session";

const availableLocales = computed(() => {
    return useI18n().availableLocales.map((locale) => {
        return {
            label: locale.toUpperCase(),
            value: locale,
        };
    });
});

watch(useI18n().locale, (newLocale, oldLocale) => {
    if (newLocale !== oldLocale) {
        session.set("locale", newLocale);
    }
});
</script>
<template>
    <div class="pr-7px overflow-y-auto overflowing-div h-500px">
        <NAlert type="info" title="Some Settings Coming Soon"> {{ $t("settings_is_still_on_development") }} </NAlert>
        <div class="flex flex-col gap-10px py-2">
            <div class="locale-changer">
                <h1 class="font-700">{{ $t("enable_dark_theme") }}</h1>
                <NSelect v-model:value="$i18n.locale" :options="availableLocales" />
            </div>
        </div>
    </div>
</template>
