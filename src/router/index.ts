import BibleTalkRoute from "../views/pages/BibleTalk/BibleTalkRoute";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import SermonPage from "@/views/pages/Sermons/Sermons.vue";
import GamesRoute from "@/views/pages/Games/Route/GamesRoute";
import Directions from "@/views/pages/Directions.vue";
import AccountPage from "@/views/pages/Account/Account.vue";
import AboutPage from "@/views/pages/About.vue";
import PrayerList from "@/views/pages/PrayerList.vue";
import Games from "@/views/pages/Games.vue";
import Donate from "@/views/pages/Donate.vue";
import BibleTalk from "@/views/pages/BibleTalk/BibleTalk.vue";

export const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/sermon",
    },
    {
        path: "/sermon",
        name: "SermonPage",
        component: SermonPage,
    },
    {
        path: "/directions",
        name: "DirectionPage",
        component: Directions,
    },
    {
        path: "/account",
        name: "AccountPage",
        component: AccountPage,
    },
    {
        path: "/about",
        name: "AboutPage",
        component: AboutPage,
    },
    {
        path: "/prayer_list",
        name: "PrayerList",
        component: PrayerList,
    },
    {
        path: "/games",
        name: "Games",
        component: Games,
        children: GamesRoute,
    },
    {
        path: "/donate",
        name: "Donate",
        component: Donate,
    },
    {
        path: "/bible-talk",
        name: "BibleTalk",
        component: BibleTalk,
        children: BibleTalkRoute,
    },
];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes,
});

export default router;
