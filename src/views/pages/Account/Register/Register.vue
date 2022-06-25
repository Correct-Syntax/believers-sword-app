<script lang="ts" setup>
import { NForm, NFormItem, NButton, NInput, NIcon, FormInst, FormItemRule } from "naive-ui";
import { h, ref } from "vue";
import { UserFollow } from "@vicons/carbon";
import { createUserAccount } from "@/service/backend/User";
import dayjs from "dayjs";

const loading = ref(false);
const formValue = ref<FormInst | null>(null);
const emit = defineEmits(["cancelClicked"]);
const form = ref<{
    email: string | null;
    password: string | null;
    retypePassword: string | null;
}>({
    email: null,
    password: null,
    retypePassword: null,
});

function validatePasswordSame(rule: FormItemRule, value: string): boolean {
    return value === form.value.password;
}

function validateEmail(rule: FormItemRule, value: string) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
}

const rules = {
    email: [
        {
            validator: validateEmail,
            message: "Please a valid email address.",
            trigger: ["blur", "input"],
        },
    ],
    password: [
        {
            required: true,
            message: "Password is very Required",
            trigger: ["blur", "input"],
        },
        {
            validator: (rule: FormItemRule, value: string) => {
                return `${value}`.length > 7;
            },
            message: "Password must be greater than 7 characters.",
            trigger: ["blur", "input"],
        },
    ],
    retypePassword: [
        {
            required: true,
            message: "Please Re-enter Password.",
            trigger: ["blur", "input"],
        },
        {
            validator: validatePasswordSame,
            message: "Password is not same as re-entered password!",
            trigger: ["blur", "input"],
        },
    ],
};

const register = () => {
    formValue.value?.validate(async (errors) => {
        if (!errors) {
            loading.value = true;
            const isUserCreateSuccess = await createUserAccount(form.value.email, form.value.password);
            if (isUserCreateSuccess) {
                const n = window.notification["success"]({
                    title: "Successfully Submitted!",
                    description: "From The Creator",
                    content: `You account is successfully created. I would like to express my gratitude for you being a part of believers sword. Use your newly created account to login.`,
                    duration: 11000,
                    meta: dayjs().format("MMM DD, YYYY"),
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

                // reset form and close modal
                form.value.email = null;
                form.value.password = null;
                form.value.retypePassword = null;
                emit("cancelClicked");
            } else {
                window.notification.error({
                    title: "Ops, System Error",
                    content: "It seems like we were not able to create your account. Please Recheck the field and submit again.",
                    duration: 5000,
                });
            }

            loading.value = false;
        } else {
            const n = window.notification["error"]({
                title: "Ops!",
                content: `Please Check the fields before submitting.`,
                meta: dayjs().format("MMM DD, YYYY"),
                duration: 4000,
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
        }
    });
};
</script>
<template>
    <NForm ref="formValue" :rules="rules" :model="form" label-width="auto">
        <div class="font-800 text-size-25px mb-30px">Register</div>
        <NFormItem label="Email Address" path="email">
            <NInput v-model:value="form.email" placeholder="Enter Email Address" />
        </NFormItem>
        <NFormItem label="Password" path="password">
            <NInput v-model:value="form.password" type="password" placeholder="Enter Password" />
        </NFormItem>
        <NFormItem label="Retype-Password" path="retypePassword" placeholder="Retype Password">
            <NInput v-model:value="form.retypePassword" type="password" placeholder="Retype Password Password" />
        </NFormItem>
        <div class="flex gap-2 mt-4">
            <NButton secondary type="primary" @click="register()">
                <template #icon>
                    <NIcon>
                        <UserFollow />
                    </NIcon>
                </template>
                Sign Up
            </NButton>
            <NButton @click="emit('cancelClicked')"> Cancel </NButton>
        </div>
    </NForm>
</template>
