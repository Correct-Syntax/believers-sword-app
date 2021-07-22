import { defineComponent } from "vue";
import MoreButton from "./MoreButton/MoreButton.vue";
import { NButton, NIcon, NSpace, NPopover } from "naive-ui";
export default defineComponent({
    name: "HeaderNav",
    components: {
        MoreButton,
        NButton,
        NIcon,
        NSpace,
        NPopover,
    },
    setup() {
        const navigates = [
            {
                title: "Read Bible",
                route: "/bible",
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M10 16c-.456.607-1.182 1-2 1H3.5A1.5 1.5 0 0 1 2 15.5v-11A1.5 1.5 0 0 1 3.5 3H8c.818 0 1.544.393 2 1c.456-.607 1.182-1 2-1h4.5A1.5 1.5 0 0 1 18 4.5v11a1.5 1.5 0 0 1-1.5 1.5H12a2.496 2.496 0 0 1-2-1zM3 4.5v11a.5.5 0 0 0 .5.5H8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 8 4H3.5a.5.5 0 0 0-.5.5zm7.5 10A1.5 1.5 0 0 0 12 16h4.5a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5H12a1.5 1.5 0 0 0-1.5 1.5v9z" fill="currentColor"></path></g></svg>`,
            },
            {
                title: "Sermons",
                route: "/sermons",
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M6 3h8a1 1 0 0 1 1 1v5.022c.343.031.678.094 1 .185V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4.257a5.503 5.503 0 0 1-.657-1H6a1 1 0 0 1-1-1h4.207a5.48 5.48 0 0 1-.185-1H5V4a1 1 0 0 1 1-1z" fill="currentColor"></path><path d="M7 4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7zm6 1v1H7V5h6z" fill="currentColor"></path><path d="M19 14.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0zm-4.98-1.966a.452.452 0 0 0-.447-.037a.49.49 0 0 0-.155.108a.51.51 0 0 0-.145.357v3.075a.503.503 0 0 0 .145.358a.562.562 0 0 0 .157.11a.45.45 0 0 0 .323.02a.522.522 0 0 0 .13-.064l2.296-1.567a.469.469 0 0 0 .163-.185a.536.536 0 0 0-.003-.487a.487.487 0 0 0-.167-.182l-2.297-1.506z" fill="currentColor"></path></g></svg>`,
            },
            {
                title: "Store",
                route: "/store",
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M9.5 7v3h-3V7h3z" fill="currentColor"></path><path d="M9.5 14v-3h-3v3h3z" fill="currentColor"></path><path d="M13.5 7v3h-3V7h3z" fill="currentColor"></path><path d="M13.5 14v-3h-3v3h3z" fill="currentColor"></path><path d="M7 4V2.5A1.5 1.5 0 0 1 8.5 1h3A1.5 1.5 0 0 1 13 2.5V4h4.5a.5.5 0 0 1 .5.5v10a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 14.5v-10a.5.5 0 0 1 .5-.5H7zm1-1.5V4h4V2.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5zm-5 12A1.5 1.5 0 0 0 4.5 16h11a1.5 1.5 0 0 0 1.5-1.5V5H3v9.5z" fill="currentColor"></path></g></svg>`,
            },
        ];

        return {
            navigates,
        };
    },
});
