import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const discussionPostStore = defineStore("discussionPostStore", () => {
    const posts = ref<any[]>([]);
    const page = ref<number>(1);

    function setPage(p: number) {
        page.value = p;
    }

    function addPosts(data: any[]) {
        posts.value = [...posts.value, ...data];
    }

    return {
        posts,
        page,
        setPage,
        resetPosts() {
            posts.value = [];
        },
        addPosts,
        async getPosts(options: { search: string | null; page: number }, refresh = false) {
            setPage(refresh ? 1 : options.page);
            if (refresh) {
                posts.value = [];
            }
            await axios
                .get(`/api/v1/post/all`, {
                    params: options,
                })
                .then(({ data }) => {
                    addPosts(data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    };
});
