import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import SermonPage from "@/views/pages/Sermons/Sermons.vue";
import GamesRoute from "@/views/pages/Games/Route/GamesRoute";
import Directions from "@/views/pages/Directions.vue";
import AccountPage from "@/views/pages/Account/Account.vue";
import AboutPage from "@/views/pages/About.vue";
import PrayerList from "@/views/pages/PrayerList.vue";
import Games from "@/views/pages/Games.vue";
import Donate from "@/views/pages/Donate.vue";
import Discussion from '@/views/pages/Discussion/Discussion.vue'

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
        path: '/discussion',
        name: 'Discussion',
        component: Discussion,
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
        component: Games,
        children: GamesRoute,
    },
    {
        path: "/donate",
        name: "Donate",
        component: Donate,
    },
];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes,
});

export default router;
