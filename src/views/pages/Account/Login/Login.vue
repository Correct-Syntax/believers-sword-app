<script lang="ts" setup>
import { NForm, NFormItem, NButton, NInput, NIcon, FormInst } from "naive-ui";
import { ref } from "vue";
import { Login, UserFollow } from "@vicons/carbon";
import { userLogin } from "@/service/backend/User";

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
    userLogin(form.value.email, form.value.password);
};
</script>
<template>
    <NForm ref="formValue" :rules="rules" :model="form" label-width="auto">
        <div class="font-800 text-size-25px mb-30px">Login</div>
        <NFormItem label="Email Address" path="email">
            <NInput v-model:value="form.email" placeholder="Enter Email Address" />
        </NFormItem>
        <NFormItem label="Password" path="password">
            <NInput v-model:value="form.password" type="password" placeholder="Enter Password" />
        </NFormItem>
        <div class="flex flex-col gap-2">
            <NButton secondary type="primary" @click="login">
                <template #icon>
                    <NIcon>
                        <Login />
                    </NIcon>
                </template>
                Sign In
            </NButton>
            <NButton quaternary type="info" @click="$emit('clickedRegisterButton')">
                <template #icon>
                    <NIcon>
                        <UserFollow />
                    </NIcon>
                </template>
                Create Account
            </NButton>
            <NButton quaternary type="info" @click="emit('clickForgotPassword')">Forgot Password</NButton>
        </div>
    </NForm>
</template>
