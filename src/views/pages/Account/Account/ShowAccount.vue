<script lang="ts" setup>
import { MenuOption, NIcon, NMenu, NCard, useDialog, useMessage, useNotification } from "naive-ui";
import { Component, h, ref } from "vue";
import { User, Logout } from "@vicons/carbon";
import ShowAccount from "./Pages/Account.vue";
import { supabase } from "@/service/SupaBase/supabase";
import SESSION from "@/service/session/session";
import { useUserStore } from "@/store/user";

const activeKey = ref("account");
const selectedKey = ref("account");
const dialog = useDialog();
const message = useMessage();
const notification = useNotification();
const userStore = useUserStore();

const logout = async () => {
    const loadingLogout = message.loading("Signing Out...", { duration: 10000 });
    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            notification.error({
                title: "Their Is An Error Logging Out.",
                content: error.message,
                duration: 5000,
            });
            loadingLogout.destroy();
            return;
        }

        SESSION.remove("session");
        userStore.setSession(null);

        notification.info({
            title: "Sign Out Successfully!",
            content: "You have successfully signed out on your account. You can sign in again, anytime.",
            duration: 5000,
        });
        loadingLogout.destroy();
    } catch (e) {
        notification.error({
            title: "Error",
            content: e as string,
            duration: 5000,
        });
        loadingLogout.destroy();
    }
};

function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions: MenuOption[] = [
    {
        label: "Account",
        key: "account",
        icon: renderIcon(User),
    },
    {
        label: "Logout",
        key: "logout",
        icon: renderIcon(Logout),
    },
];

const clickMenu = (key: string) => {
    if (key == "logout") {
        dialog.warning({
            title: "Logout",
            content: "Are you sure you want to logout?",
            positiveText: "Yes, Log me Out",
            negativeText: "No",
            onPositiveClick: () => {
                logout();
            },
            onNegativeClick: () => {
                message.info("Cancelled.");
            },
        });
        return;
    }
    activeKey.value = key;
    selectedKey.value = activeKey.value;
};
</script>
<template>
    <div class="flex p-10px gap-20px h-[100%]">
        <div class="w-300px">
            <NMenu v-model:value="activeKey" :options="menuOptions" :on-update:value="clickMenu" />
        </div>
        <NCard class="w-[100%] h-[100%]">
            <ShowAccount v-if="selectedKey === 'account'" />
        </NCard>
    </div>
</template>
