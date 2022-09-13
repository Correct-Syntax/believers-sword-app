import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useUserStore = defineStore("useUserStore", () => {
    const session = ref(null);
    const isUserLogged = ref(false);

    watch(session, (data) => {
        isUserLogged.value = !!data;
    });

    return {
        session,
        setSession(data: any) {
            session.value = data;
        },
        isUserLogged,
    };
});
