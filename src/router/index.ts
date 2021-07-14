import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
    RouteRecordRaw,
} from "vue-router";
import Bible from "../views/Bible/Bible.vue";
import dotenv from "dotenv";
dotenv.config();

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/bible",
    },
    {
        path: "/bible",
        name: "Bible",
        component: Bible,
    },
    {
        path: "/sermons",
        name: "Sermons",
        component: () =>
            import(
                /* webpackChunkName: "Sermons" */ "../views/Sermon/Sermon.vue"
            ),
    },
    {
        path: "/store",
        name: "Store",
        component: () =>
            import(
                /* webpackChunkName: "Sermons" */ "../views/Store/Store.vue"
            ),
    },
    {
        path: "/:catchAll(.*)",
        name: "PageNotFound",
        component: () =>
            import(
                /* webpackChunkName: "PageNotFound" */ "./../views/PageNotFound/PageNotFound.vue"
            ),
    },
];

const router = createRouter({
    history:
        process.env.ELECTRON == "true"
            ? createWebHashHistory()
            : createWebHistory(),
    routes,
});

export default router;
