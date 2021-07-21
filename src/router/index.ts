import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
    RouteRecordRaw,
} from "vue-router";
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
        component: () =>
            import(/* webpackChunkName: "Bible" */ "../views/Bible/Bible.vue"),
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
        path: "/view/:id",
        name: "ViewSermon",
        component: () =>
            import(
                /* webpackChunkName: "ViewSermon" */ "./../views/Sermon/View/ViewSermon.vue"
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
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
    history: process.env.ELECTRON
        ? process.env.ELECTRON == "true"
            ? createWebHashHistory()
            : createWebHistory()
        : createWebHistory(),
    routes,
});

export default router;
