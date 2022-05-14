<script lang="ts">
import { NIcon } from "naive-ui";
import { h } from "vue";
export default {
    props: ["icon", "options"],
    setup(props: { options: any; icon: any }) {
        return () => h(NIcon, props.options ? props.options : {}, () => h(props.icon));
    },
};
</script>
