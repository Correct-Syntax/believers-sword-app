<script lang="ts" setup>
import { NForm, NFormItem, NButton, NInput, NIcon, FormInst } from "naive-ui";
import { ref } from "vue";
import { UserFollow } from "@vicons/carbon";

const formValue = ref<FormInst | null>(null);
const emit = defineEmits(["cancelClicked"]);
const form = ref({
    email: null,
    password: null,
    retypePassword: null,
});

const rules = {
    email: {
        required: true,
        message: "Please input your name",
        trigger: ["blur", "input"],
    },
    password: {
        required: true,
        message: "Enter Desired Password",
        trigger: ["blur", "input"],
    },
    retypePassword: {
        required: true,
        message: "Re enter Password",
        trigger: ["blur", "input"],
    },
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
        <NFormItem label="Retype-Password" path="retypePassword">
            <NInput v-model:value="form.retypePassword" type="password" placeholder="Enter Password" />
        </NFormItem>
        <div class="flex gap-2">
            <NButton secondary type="primary">
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
