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
    const { user } = getUserLogged();
    accountForm.value.email = user.email;
});
</script>
<template>
    <div>
        <NAlert title="Account Pages" type="info">
            Hi! this account page still on development. And we are still working on it. Hoping we can add some features here in the feature. For now you can only see your account.
        </NAlert>
        <NForm class="mt-30px">
            <NFormItem label="Email Address">
                <NInput v-model:value="accountForm.email" readonly />
            </NFormItem>
        </NForm>
    </div>
</template>
