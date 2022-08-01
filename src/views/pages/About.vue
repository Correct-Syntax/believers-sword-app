<script lang="ts" setup>
import { ipcRenderer } from "electron";
import DonateComponent from "@/components/Donate/Donate.vue";
import Divider from "@/components/Divider/Divider.vue";

const clickLink = (link: string, newWindow = false, title = "Believers Sword App") => {
    let params: any = { link };
    params.title = title;
    if (newWindow) params["windowed"] = true;
    ipcRenderer.send("clickExternalLink", params);
};
</script>

<template>
    <div class="h-[100%] p-20px overflow-y-auto overflowing-div scroll-bar-sm">
        <div class="max-w-700px w-[100%] mx-auto">
            <div class="flex justify-center">
                <img class="mx-10px" src="./../../assets/logo.svg" width="140" />
            </div>
            <h1 class="text-size-34px font-700 text-center py-30px">{{ $t("about_the_application") }}</h1>
        </div>
        <div class="max-w-700px w-[100%] mx-auto">
            <div class="text-size-18px leading-normal">
                <div class="mb-20px">
                    <div v-html="$t('about_the_application_body')"></div>
                    <Divider />
                    <div>
                        <img
                            class="rounded-md float-left mx-10px cursor-pointer"
                            src="./../../assets/images/me.png"
                            width="100"
                            @click="clickLink(`https://jenuelganawed.com`, true, 'Jenuel Oras Ganawed')"
                        />
                        Hi! I am
                        <span @click="clickLink(`https://jenuelganawed.com`, true, 'Jenuel Oras Ganawed')" class="cursor-pointer hover:underline text-[var(--primaryColor)]">
                            <b>Jenuel Oras Ganawed</b>
                        </span>
                        and I am the creator of this application. I am grateful that you tried this application I built.<br /><br />

                        I created this application because I like to use my talent in the ministry.
                    </div>

                    <Divider />
                </div>
            </div>
        </div>
        <DonateComponent :textWidth="700" />
    </div>
</template>
