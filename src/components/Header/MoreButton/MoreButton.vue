<template>
    <NDropdown
        :options="options"
        placement="bottom-start"
        trigger="click"
        @select="handleSelect"
    >
        <NButton circle>
            <NIcon size="25">
                <MoreVertical32Filled />
            </NIcon>
        </NButton>
    </NDropdown>
</template>
<script lang="ts">
import { NIcon, NButton, NDropdown } from "naive-ui";
import { MoreVertical32Filled, ReceiptMoney20Regular } from "@vicons/fluent";
import { h, defineComponent } from "vue";
export default defineComponent({
    name: "MoreButton",
    components: {
        NIcon,
        MoreVertical32Filled,
        NButton,
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
                    return h(NIcon, null, {
                        default: () => h(ReceiptMoney20Regular),
                    });
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
