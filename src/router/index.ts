import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import ReadBible from "@/views/pages/ReadBible.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "ReadBiblePage",
        component: ReadBible
    },
    {
        path: "/sermon",
        name: "SermonPage",
        component: () => import("./../views/pages/Sermons.vue")
    },
    {
        path: "/directions",
        name: "DirectionPage",
        component: () => import("./../views/pages/Directions.vue")
    },
    {
        path: "/account",
        name: "AccountPage",
        component: () => import("./../views/pages/Account.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
});

export default router;
