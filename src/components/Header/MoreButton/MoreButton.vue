<template>
    <NDropdown
        :options="options"
        placement="bottom-start"
        trigger="click"
        @select="handleSelect"
    >
        <NButton circle>
            <NIcon size="30">
                <MoreVertical20Regular />
            </NIcon>
        </NButton>
    </NDropdown>
</template>
<script lang="ts">
import { NIcon, NButton, NDropdown } from "naive-ui";
import { MoreVertical20Regular, AddCircle20Regular } from "@vicons/fluent";
import { h, defineComponent } from "vue";
export default defineComponent({
    name: "MoreButton",
    components: {
        NIcon,
        NButton,
        MoreVertical20Regular,
        NDropdown,
    },
    setup() {
        const options = [
            {
                label: "Jay Gatsby",
                key: "jay gatsby",
            },
            {
                label: "Daisy Buchanan",
                icon() {
                    return h(
                        NIcon,
                        { size: "20" },
                        {
                            default: () => h(AddCircle20Regular),
                        }
                    );
                },
                key: "daisy buchanan",
            },
            {
                type: "divider",
                key: "d1",
            },
            {
                label: "Nick Carraway",
                key: "nick carraway",
            },
            {
                label: "Others",
                key: "others1",
                children: [
                    {
                        label: "Jordan Baker",
                        key: "jordan baker",
                    },
                    {
                        label: "Tom Buchanan",
                        key: "tom buchanan",
                    },
                    {
                        label: "Others",
                        key: "others2",
                        disabled: true,
                        children: [
                            {
                                label: "Chicken",
                                key: "chicken",
                            },
                            {
                                label: "Beef",
                                key: "beef",
                            },
                        ],
                    },
                ],
            },
        ];

        const handleSelect = (key: string) => {
            console.log(key);
        };

        return {
            options,
            handleSelect,
        };
    },
});
</script>
