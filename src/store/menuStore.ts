import SESSION from "@/service/session/session";
import { defineStore } from "pinia";
import { onMounted, ref } from "vue";

export const useMenuStore = defineStore("useMenuStore", () => {
    const selectedMenu = ref("");
    const showSettings = ref(false);

    onMounted(() => {
        const menu = SESSION.get("selectedMenu");
        if (menu) {
            selectedMenu.value = menu;
        }
    });

    return {
        selectedMenu,
        showSettings,
        setSelectedMenu(menu: string) {
            selectedMenu.value = menu;
        },
    };
});
