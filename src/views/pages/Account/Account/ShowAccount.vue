<script lang="ts" setup>
import { userLogout } from "@/service/backend/User";
import { MenuOption, NIcon, NMenu, NCard, NPopconfirm } from "naive-ui";
import { Component, h, ref, watch } from "vue";
import { User, Logout } from "@vicons/carbon";
import ShowAccount from "./Pages/Account.vue";

const logout = async () => {
    await userLogout();
};

const activeKey = ref("account");
const selectedKey = ref("account");

watch(activeKey, (key) => {
    if (key == "logout") return;
    selectedKey.value = activeKey.value;
});

function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions: MenuOption[] = [
    {
        label: "Account",
        key: "account",
        // disabled: true,
        icon: renderIcon(User),
    },
    {
        // label: "Logout",
        label: () =>
            h(
                NPopconfirm,
                {
                    onPositiveClick: () => {
                        logout();
                    },
                    onNegativeClick: () => {
                        window.message.info("Cancelled");
                    },
                },
                {
                    default: () => "Are You Sure You Want to Logout?",
                    trigger: () => "Logout",
                }
            ),
        key: "logout",
        // disabled: true,
        icon: renderIcon(Logout),
    },
];
</script>
<template>
    <div class="flex p-10px gap-20px h-[100%]">
        <div class="w-300px">
            <NMenu v-model:value="activeKey" :options="menuOptions" />
        </div>
        <NCard class="w-[100%] h-[100%]">
            <ShowAccount v-show="selectedKey === 'account'" />
        </NCard>
    </div>
</template>
