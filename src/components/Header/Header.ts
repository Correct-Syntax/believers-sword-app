import { defineComponent } from "vue";
import MoreButton from "./MoreButton/MoreButton.vue";
import { NButton, NIcon, NSpace } from "naive-ui";
export default defineComponent({
    name: "HeaderNav",
    components: {
        MoreButton,
        NButton,
        NIcon,
        NSpace,
    },
});
