export default [
    {
        path: "",
        component: () => import("@/views/pages/Games/SelectGames.vue")
    },
    {
        path: "/qna",
        name: "QNA",
        component: () => import("@/views/pages/Games/QuestionAndAnswer/QandA.vue")
    }
];
