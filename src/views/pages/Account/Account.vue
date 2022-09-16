<script lang="ts" setup>
import Login from "./Login/Login.vue";
import RegisterModal from "./Register/RegisterModal.vue";
import { onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import ShowAccount from "./Account/ShowAccount.vue";
import SESSION from "@/service/session/session";
import { useUserStore } from "@/store/user";

const registerModalRef = ref<{ toggleModal: any }>();
const store = useStore();

const userStore = useUserStore();

function toggleRegister() {
    registerModalRef.value?.toggleModal();
}

onBeforeMount(() => {
    if (SESSION.get("session")) {
        store.dispatch("isUserLoggedToggle", true);
        userStore.setSession(SESSION.get("session"));
    }
});

function toggleForgotPassword() {
    console.log("Forgot Password");
}
</script>

<template>
    <div class="h-[100%]" v-if="userStore.isUserLogged">
        <ShowAccount />
    </div>
    <div v-else class="pt-5">
        <RegisterModal ref="registerModalRef" />
        <Login
            class="max-w-300px mx-auto"
            @clickedRegisterButton="toggleRegister"
            @clickForgotPassword="toggleForgotPassword"
        />
    </div>
</template>
