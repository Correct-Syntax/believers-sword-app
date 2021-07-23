import { useStore } from "vuex";
import { options } from "./Options";
import { NIcon, NButton, NDropdown } from "naive-ui";
import { OfficeApps20Regular, Lightbulb20Filled } from "@vicons/fluent";
import { defineComponent } from "vue";
export default defineComponent({
    name: "MoreButton",
    components: {
        NIcon,
        NButton,
        OfficeApps20Regular,
        NDropdown,
        Lightbulb20Filled,
    },
    setup() {
        const store = useStore();
        const handleSelect = (key: string) => {
            if (key == "change-theme") {
                const theme = store.state.theme == "dark" ? "light" : "dark";
                store.state.theme = theme;
                localStorage.setItem("bs-theme", theme);
            }
        };

        return {
            options,
            handleSelect,
        };
    },
});
