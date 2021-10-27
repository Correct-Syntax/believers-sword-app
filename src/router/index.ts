import BibleTalkRoute from '../views/pages/BibleTalk/BibleTalkRoute';
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import SermonPage from "@/views/pages/Sermons.vue"
import GamesRoute from "@/views/pages/Games/Route/GamesRoute";

export const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/sermon"
    },
    {
        path: "/sermon",
        name: "SermonPage",
        component: SermonPage
    },
    {
        path: "/directions",
        name: "DirectionPage",
        component: () => import("@/views/pages/Directions.vue")
    },
    {
        path: "/account",
        name: "AccountPage",
        component: () => import("@/views/pages/Account.vue")
    },
    {
        path: "/about",
        name: "AboutPage",
        component: () => import("@/views/pages/About.vue")
    },
    {
        path: "/prayer_list",
        name: "PrayerList",
        component: () => import("@/views/pages/PrayerList.vue")
    },
    {
        path: "/games",
        name: "Games",
        component: () => import("@/views/pages/Games.vue"),
        children: GamesRoute
    },
    {
        path: "/donate",
        name: "Donate",
        component: () => import("@/views/pages/Donate.vue")
    },
    {
        path: "/bible-talk",
        name: "BibleTalk",
        component: () => import("@/views/pages/BibleTalk/BibleTalk.vue"),
        children: BibleTalkRoute
    }
];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
});

export default router;
