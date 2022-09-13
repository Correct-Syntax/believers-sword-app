<script setup lang="ts">
import { shell } from "electron";
import { useRouter } from "vue-router";

const router = useRouter();
const ads = [
    {
        image: require("./../../../../assets/images/facebook-screenshot.png"),
        label: "Help Believers Developer",
        description:
            "Follow Believers On Social Media, and get updated on our latest believers sword news and motivational qoutes.",
        link: "https://www.facebook.com/Believers.Sword",
        linkType: "blank",
        buttonText: "Check Facebook Page",
    },
    {
        image: require("./../../../../assets/images/donate-screen.png"),
        label: "Help Believers Developer",
        description:
            "Hi! I made this piece of software for free, if you like to donate coffee, you can click the button below. To God be the Glory.",
        link: "/donate",
        linkType: "route",
        buttonText: "Go and Donate",
    },
];

function openLink(ad: any) {
    if (ad.linkType == "route") router.push({ name: "Donate" });
    else if (ad.linkType == "blank") shell.openExternal(ad.link);
}
</script>
<template>
    <div v-for="ad in ads" :key="ad.label" class="p-3 text-center">
        <div class="h-120px overflow-hidden rounded-md mb-2 block">
            <img :src="ad.image" />
        </div>
        <h2 class="font-800">{{ ad.label }}</h2>
        <p>{{ ad.description }}</p>
        <button
            class="text-left px-10px py-9px rounded-xl dark:hover:text-[var(--primaryColor)] text-size-15px dark:bg-blue-100 dark:bg-opacity-5 hover:bg-gray-900 hover:bg-opacity-5 mt-3"
            @click="openLink(ad)"
        >
            {{ ad.buttonText }}
        </button>
    </div>
</template>
