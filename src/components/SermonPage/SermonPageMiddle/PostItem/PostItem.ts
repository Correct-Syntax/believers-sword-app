import { NRate, NCard, NButton, NTag, NSpace } from "naive-ui";
import { useStore } from "vuex";
export default {
    name: "PostItem",
    components: { NRate, NCard, NButton, NTag, NSpace },
    setup() {
        const store = useStore();

        return {
            isWeb: store.state.isWeb,
        };
    },
};
