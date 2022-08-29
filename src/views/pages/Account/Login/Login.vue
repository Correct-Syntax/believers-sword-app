<script lang="ts" setup>
import { NForm, NFormItem, NButton, NInput, NIcon, FormInst } from "naive-ui";
import { ref } from "vue";
import { Login, UserFollow } from "@vicons/carbon";
import { userLogin } from "@/service/backend/User";

const loading = ref(false);
const formValue = ref<FormInst | null>(null);
const form = ref<{ email: any; password: any }>({
    email: null,
    password: null,
});

const emit = defineEmits(["clickedRegisterButton", "clickForgotPassword"]);

const rules = {
    email: {
        required: true,
        message: "Enter Your Email",
        trigger: "blur",
    },
    password: {
        required: true,
        message: "Enter You Password",
        trigger: "blur",
    },
};

const login = () => {
    formValue.value?.validate(async (errors) => {
        if (!errors) {
            try {
                loading.value = true;
                const loginSuccessful = await userLogin(form.value.email, form.value.password);

                if (loginSuccessful) {
                    window.notification.success({
                        title: "Login Successful",
                        content: "You are successfully logged to believers sword.",
                        duration: 5000,
                    });
                } else {
                    window.notification.error({
                        title: "Login Unsuccessful",
                        content: "Your Email or Password is wrong.",
                        duration: 5000,
                    });
                }
                loading.value = false;
            } catch (e) {
                window.notification.error({
                    title: "Login Unsuccessful",
                    content: e as string,
                    duration: 5000,
                });
                loading.value = false;
            }
        }
    });
};
</script>
<template>
    <NForm ref="formValue" :rules="rules" :model="form" label-width="auto">
        <div class="font-800 text-size-25px mb-30px">{{ $t("login") }}</div>
        <NFormItem label="Email Address" path="email">
            <NInput class="select-all" v-model:value="form.email" placeholder="Enter Email Address" />
        </NFormItem>
        <NFormItem label="Password" path="password">
            <NInput v-model:value="form.password" type="password" placeholder="Enter Password" />
        </NFormItem>
        <div class="flex flex-col gap-2">
            <NButton secondary type="primary" @click="login" :loading="loading" :disabled="loading">
                <template #icon>
                    <NIcon>
                        <Login />
                    </NIcon>
                </template>
                {{ $t("sign_in") }}
            </NButton>
            <NButton quaternary type="info" @click="$emit('clickedRegisterButton')" :disabled="loading">
                <template #icon>
                    <NIcon>
                        <UserFollow />
                    </NIcon>
                </template>
                {{ $t("create_account") }}
            </NButton>
            <NButton quaternary type="info" @click="emit('clickForgotPassword')" :disabled="loading">{{
                $t("forgot_password")
            }}</NButton>
        </div>
    </NForm>
</template>
