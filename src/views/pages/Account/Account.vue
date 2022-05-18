<script lang="ts" setup>
import Login from "./Login/Login.vue";
import RegisterModal from "./Register/RegisterModal.vue";
import { onBeforeMount, ref } from "vue";
import { getUserLogged, userLogout } from "@/service/backend/User";
import { NButton } from "naive-ui";
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";

const registerModalRef = ref<{ toggleModal: any }>();
const store = useStore();
const isLoggedIn = computed(() => store.state.isUserLogged);

function toggleRegister() {
    registerModalRef.value?.toggleModal();
}

onBeforeMount(() => {
    if (getUserLogged()) {
        store.dispatch("isUserLoggedToggle", true);
    }
});

function toggleForgotPassword() {
    console.log("Forgot Password");
}

const logout = async () => {
    await userLogout();
};
</script>

<template>
    <div v-if="isLoggedIn">
        User is Logged IN
        <div>
            <NButton @click="logout()"> Logout </NButton>
        </div>
    </div>
    <div v-else class="pt-5">
        <RegisterModal ref="registerModalRef" />
        <Login class="max-w-300px mx-auto" @clickedRegisterButton="toggleRegister" @clickForgotPassword="toggleForgotPassword" />
    </div>
</template>
