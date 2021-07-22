<template>
    <NDropdown
        :options="options"
        placement="bottom-start"
        trigger="click"
        @select="handleSelect"
        class="h-full"
    >
        <NButton
            circle
            text
            color="black"
            class="
                h-full
                flex
                justify-center
                items-center
                w-[70px]
                hover:bg-gray-200
                rounded-lg
                duration-300
                cursor-pointer
            "
        >
            <NIcon size="30">
                <OfficeApps20Filled />
            </NIcon>
        </NButton>
    </NDropdown>
</template>
<script lang="ts">
import { NIcon, NButton, NDropdown } from "naive-ui";
import { OfficeApps20Filled, AddCircle20Regular } from "@vicons/fluent";
import { h, defineComponent } from "vue";
export default defineComponent({
    name: "MoreButton",
    components: {
        NIcon,
        NButton,
        OfficeApps20Filled,
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
