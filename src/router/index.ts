import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import ReadBible from "@/views/pages/ReadBible.vue";
import Sermon from "@/views/pages/Sermons.vue"
import DirectionPage from "@/views/pages/Directions.vue"
import Account from "@/views/pages/Account.vue"
import Donate from "@/views/pages/Donate.vue"
import HelpPage from "@/views/pages/Help.vue"
import SettingPage from "@/views/pages/Settings.vue"

export const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "ReadBiblePage",
        component: ReadBible
    },
    {
        path: "/sermon",
        name: "SermonPage",
        component: Sermon
    },
    {
        path: "/directions",
        name: "DirectionPage",
        component: DirectionPage
    },
    {
        path: "/account",
        name: "AccountPage",
        component: Account
    },
    {
        path: "/donate",
        name: "DonatePage",
        component: Donate
    },
    {
        path: "/help",
        name: "HelpPage",
        component: HelpPage
    },
    {
        path: "/settings",
        name: "SettingPage",
        component: SettingPage
    },
];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
});

export default router;
