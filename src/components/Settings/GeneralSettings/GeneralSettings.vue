<script lang="ts" setup>
import SESSION from "@/service/session/session";
import { NAlert, NSelect } from "naive-ui";
import { watch } from "vue";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();

watch(locale, (newLocale, oldLocale) => {
    if (newLocale !== oldLocale) {
        SESSION.set("locale", newLocale);
    }
});
</script>
<template>
    <div class="pr-7px overflow-y-auto overflowing-div h-500px">
        <NAlert type="info" title="Some Settings Coming Soon"> {{ $t("settings_is_still_on_development") }} </NAlert>
        <div class="flex flex-col gap-10px py-2">
            <div class="locale-changer">
                <h1 class="font-700">{{ $t("enable_dark_theme") }}</h1>
                <NSelect
                    v-model:value="$i18n.locale"
                    :options="
                        $i18n.availableLocales.map((loc) => {
                            return {
                                label: loc.toUpperCase(),
                                value: loc,
                            };
                        })
                    "
                />
            </div>
        </div>
    </div>
</template>
