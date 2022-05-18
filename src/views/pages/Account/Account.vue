<script lang="ts" setup>
import Login from "./Login/Login.vue";
import RegisterModal from "./Register/RegisterModal.vue";
import { ref } from "vue";

const registerModalRef = ref<{ toggleModal: any }>();

function toggleRegister() {
    registerModalRef.value?.toggleModal();
}

function toggleForgotPassword() {
    console.log("Forgot Password");
}
</script>

<template>
    <div class="pt-5">
        <RegisterModal ref="registerModalRef" />
        <Login class="max-w-300px mx-auto" @clickedRegisterButton="toggleRegister" @clickForgotPassword="toggleForgotPassword" />
    </div>
</template>
