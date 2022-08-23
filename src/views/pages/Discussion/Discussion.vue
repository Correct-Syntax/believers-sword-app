<script setup lang="ts">
import session from "@/service/session/session";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import LeftSideMenu from "./LeftSideMenu/LeftSideMenu.vue";
import RightSideArea from "./RightSideArea/RightSideArea.vue";

const selectedMenu = ref<string | null>("all_discussions");
const route = useRoute();

watch(
    () => route.name,
    (routeName) => {
        if (routeName == "Discussion") {
            const discussionContentElement = document.getElementById("discussion-contents");
            const scrollTopValue = session.get("discussion-content-scroll-top");

            if (scrollTopValue) {
                setTimeout(() => {
                    discussionContentElement?.scrollTo({
                        top: scrollTopValue,
                    });
                }, 50);
            }
        }
    }
);

onMounted(() => {
    // this will save scroll
    const discussionContentElement = document.getElementById("discussion-contents");

    if (session.get("discussion-content-scroll-top")) {
        discussionContentElement?.scrollTo(session.get("discussion-content-scroll-top"), 0);
    }

    discussionContentElement?.addEventListener("scroll", (event) => {
        clearTimeout(window.discussionContentScrollTop);

        if (route.name == "Discussion") {
            window.discussionContentScrollTop = setTimeout(() => {
                session.set("discussion-content-scroll-top", discussionContentElement.scrollTop);
            }, 200);
        }
    });
});
</script>
<template>
    <div id="discussion-contents" class="h-[100%] h-[100%] overflow-y-scroll overflowing-div scroll-bar-md">
        <div class="p-9 max-w-1300px mx-auto flex gap-5">
            <div class="w-350px sticky top-5 self-start">
                <LeftSideMenu v-model="selectedMenu" />
            </div>
            <div class="w-[100%]">
                <router-view />
            </div>
            <div class="w-350px sticky top-5 self-start">
                <RightSideArea />
            </div>
        </div>
    </div>
</template>
