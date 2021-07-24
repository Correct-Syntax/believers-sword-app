import { AddCircle20Regular, Lightbulb20Filled } from "@vicons/fluent";
import { NIcon } from "naive-ui";
import { h } from "vue";

export const options = [
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
        label: "Change Theme",
        icon() {
            return h(
                NIcon,
                { size: "20" },
                {
                    default: () => h(Lightbulb20Filled),
                }
            );
        },
        key: "change-theme",
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
        label: "About",
        key: "about",
    },
    // {
    //     label: "Others",
    //     key: "others1",
    //     children: [
    //         {
    //             label: "Jordan Baker",
    //             key: "jordan baker",
    //         },
    //         {
    //             label: "Tom Buchanan",
    //             key: "tom buchanan",
    //         },
    //         {
    //             label: "Others",
    //             key: "others2",
    //             disabled: true,
    //             children: [
    //                 {
    //                     label: "Chicken",
    //                     key: "chicken",
    //                 },
    //                 {
    //                     label: "Beef",
    //                     key: "beef",
    //                 },
    //             ],
    //         },
    //     ],
    // },
    {
        label: "Logout",
        key: "logout",
    },
];
