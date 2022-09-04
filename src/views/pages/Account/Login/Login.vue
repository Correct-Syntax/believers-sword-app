<script lang="ts" setup>
import { NForm, NFormItem, NButton, NInput, NIcon, FormInst } from "naive-ui";
import { h, ref } from "vue";
import { Login, UserFollow } from "@vicons/carbon";
// import { userLogin } from "@/service/backend/User";
import { supabase } from "@/service/SupaBase/supabase";
import SESSION from "@/service/session/session";
import { useUserStore } from "@/store/user";
import dayjs from "dayjs";

const loading = ref(false);
const formValue = ref<FormInst | null>(null);
const theUserStore = useUserStore();
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
                const { error, session } = await supabase.auth.signIn({
                    email: form.value.email,
                    password: form.value.password,
                });

                if (error) {
                    loading.value = false;
                    const n = window.notification["error"]({
                        title: error.message,
                        content:
                            error.message == "Email not confirmed"
                                ? "Check The Email we Sent to confirm registration."
                                : error.message,
                        meta: dayjs().format("MMM DD, YYYY"),
                        duration: 10000,
                        action: () =>
                            h(
                                NButton,
                                {
                                    text: true,
                                    type: "primary",
                                    onClick: () => {
                                        n.destroy();
                                    },
                                },
                                {
                                    default: () => "Mark as Read",
                                }
                            ),
                    });
                    return;
                }

                SESSION.set("session", session);
                theUserStore.setSession(session);

                window.notification.success({
                    title: "Login Successfully",
                    content: "You have Successfully logged in to believers sword.",
                    duration: 3000,
                });
                loading.value = false;

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
