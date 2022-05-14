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
            <h1 class="text-size-34px font-700 text-center py-30px">About the Application</h1>
        </div>
        <div class="max-w-700px w-[100%] mx-auto">
            <div class="text-size-18px leading-normal">
                <div class="mb-20px">
                    <div>
                        <img
                            class="rounded-md float-left mx-10px cursor-pointer"
                            src="./../../assets/images/me.png"
                            width="230"
                            @click="clickLink(`https://jenuelganawed.com`, true, 'Jenuel Oras Ganawed')"
                        />
                        Hi! I am
                        <span @click="clickLink(`https://jenuelganawed.com`, true, 'Jenuel Oras Ganawed')" class="cursor-pointer hover:underline text-[var(--primaryColor)]">
                            <b>Jenuel Oras Ganawed</b>
                        </span>
                        or call me Bro Jenuel/Mister J. and I am the creator of this application. I am so very thankful that you decided to try this application, as a developer I
                        am very much happy when people starts using this application.<br /><br />

                        I created this application because I like to use my talent in the ministry. I am putting the features that I like, and I am open for any suggestions to make
                        the app better.
                    </div>

                    <Divider />

                    <div>
                        <span class="text-[var(--primaryColor)] font-600">"Believers Sword"</span> is simple and I hope that it will be an amazing application that helps you study
                        the bible in an enjoyable and enriching manner.

                        <br /><br />
                        I called it sword, because I believe that when you read the bible and understand what is written, that is the time it becomes a sword. Reading with no
                        understanding will not become a sword. And to use the sword we have to follow what is written in the Sword/Bible. Example, It is written in the sword that
                        you should pray, so if ye pray, you are using the sword. The bible says obey your parents in the lord, so if we obey our parents, we are using the sword.
                        And many more.

                        <br /><br />
                        But always be careful, use the sword in a right way.
                    </div>

                    <Divider />

                    This app is not Bad or Good its <span class="font-700 text-[var(--primaryColor)]">"Sakto Lang"</span> (a pilipino term for
                    <span class="italic font-600">`just right`</span>). I am praying that this simple bible studying software will help you study the bible.
                    <Divider />
                </div>
            </div>
        </div>
        <DonateComponent :textWidth="700" />
        <hr v-show="false" class="my-40px opacity-30" />
        <div v-show="false" class="max-w-700px w-[100%] mx-auto">
            <h1 class="text-size-18px font-700">Are you a developer?</h1>
            <p>
                If your a developer and like or love to help in the development, you can FORK this
                <span class="cursor-pointer hover:text-[var(--primaryColor)]" @click="clickLink(`https://github.com/Bible-Projects/believers-sword-app`)"
                    ><b>GITHUB REPOSITORY</b></span
                >, and you can submit a Request, and I will be reviewing/checking your code contributions.
            </p>
            <div class="text-center flex justify-center mt-30px">
                <img class="rounded-3xl" src="./../../assets/images/toGodBeTheGlory.jpg" alt="" />
            </div>
        </div>
    </div>
</template>
