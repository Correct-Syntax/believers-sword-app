<script lang="ts" setup>
import { userLogout } from "@/service/backend/User";
import { MenuOption, NIcon, NMenu, NCard, useDialog, useMessage, useNotification } from "naive-ui";
import { Component, h, ref } from "vue";
import { User, Logout } from "@vicons/carbon";
import ShowAccount from "./Pages/Account.vue";
import dayjs from "dayjs";

const activeKey = ref("account");
const selectedKey = ref("account");
const dialog = useDialog();
const message = useMessage();
const notification = useNotification();

const logout = async () => {
    try {
        let isLoggedOut = await userLogout();
        if (isLoggedOut) message.success("Successfully Logged Out.");
        else
            notification.error({
                content: "Oops, their is an error logging out.",
                meta: dayjs(new Date()).format("MMMM DD, YYYY hh:mm:ss a"),
                duration: 5000,
            });
    } catch (e) {
        notification.error({
            title: "Error",
            content: e as string,
            duration: 5000,
        });
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
            <ShowAccount v-show="selectedKey === 'account'" />
        </NCard>
    </div>
</template>
