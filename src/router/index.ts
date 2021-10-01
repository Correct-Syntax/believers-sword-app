import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import SermonPage from "@/views/pages/Sermons.vue"

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
        path: "/donate",
        name: "DonatePage",
        component: () => import("@/views/pages/Donate.vue")
    },
    {
        path: "/help",
        name: "HelpPage",
        component: () => import("@/views/pages/Help.vue")
    },
    {
        path: "/settings",
        name: "SettingPage",
        component: () => import("@/views/pages/Settings.vue")
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
        children: [
            {
                path: "",
                component: () => import("@/views/pages/Games/SelectGames.vue")
            },
            {
                path: "/qna",
                name: "QNA",
                component: () => import("@/views/pages/Games/QuestionAndAnswer/QandA.vue")
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
});

export default router;
