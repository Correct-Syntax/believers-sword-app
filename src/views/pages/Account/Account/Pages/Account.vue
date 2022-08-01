<script lang="ts" setup>
import { getUserLogged } from "@/service/backend/User";
import { NAlert, NForm, NFormItem, NInput } from "naive-ui";
import { onMounted, ref } from "vue";

const accountForm = ref<{
    email: string | null;
}>({
    email: null,
});

onMounted(() => {
    const user = getUserLogged();
    accountForm.value.email = user.email;
});
</script>
<template>
    <div>
        <NAlert title="Account Pages" type="info">
            {{ $t("account_page_is_still_on_development") }}
        </NAlert>
        <NForm class="mt-30px">
            <NFormItem label="Email Address">
                <NInput v-model:value="accountForm.email" readonly />
            </NFormItem>
        </NForm>
    </div>
</template>
