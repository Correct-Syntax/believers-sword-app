<script lang="ts" setup>
import Login from "./Login/Login.vue";
import RegisterModal from "./Register/RegisterModal.vue";
import { onBeforeMount, ref } from "vue";
import { getUserLogged } from "@/service/backend/User";
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import ShowAccount from "./Account/ShowAccount.vue";

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
</script>

<template>
    <div class="h-[100%]" v-if="isLoggedIn">
        <ShowAccount />
    </div>
    <div v-else class="pt-5">
        <RegisterModal ref="registerModalRef" />
        <Login class="max-w-300px mx-auto" @clickedRegisterButton="toggleRegister" @clickForgotPassword="toggleForgotPassword" />
    </div>
</template>
