<template>
    <div class="h-[100%] p-20px overflow-y-auto overflowing-div scroll-bar-sm">
        <div class="max-w-700px w-[100%] mx-auto">
            <h1 class="text-size-34px font-700 text-center py-30px">Thank You for Trying This application! 🥰</h1>
        </div>
        <div class="max-w-700px w-[100%] mx-auto">
            <div class="text-size-18px leading-normal">
                <div class="mb-20px">
                    <img class="rounded-md float-right m-10px" src="./../../assets/images/me.png" width="300" />
                    Hi! I am
                    <span @click="clickLink(`https://jenuelganawed.com`, true, 'Jenuel Oras Ganawed')" class="cursor-pointer hover:underline text-[var(--primaryColor)]">
                        <b>Jenuel Oras Ganawed</b>
                    </span>
                    or call me Bro Jenuel/Mister J. and I am the creator of this application. <br /><br />

                    I created this application because I like to use my talent in the ministry. I am putting the features that I like, and I am open for any suggestions to make the
                    app better.<br /><br />

                    "Believers App" is a simple and an amazing application that helps you study the bible in an enjoyable and enriching manner. <br />
                    <br />This app is not Bad or Good its <span class="font-700 dark:text-yellow-300 text-yellow-600">"Sakto Lang"</span> (a pilipino term for
                    <span class="italic font-600">`just right`</span>). I am praying that this simple bible right here will help you study the bible.
                </div>

                <NAlert title="This App Absolutely Free" type="warning">
                    I am sharing this application to you for <b>FREE</b>. That means selling a copy of this application is forbidden. The word of God is free, so I am forbidding
                    anyone selling a copy.
                </NAlert>
                <br />
                If this ministry blesses you, and like to join me. You can <b>Support</b> this application financially, you can donate by selecting any of the choices bellow. Even
                if you donate or not, this application is always free on the internet.
            </div>
        </div>
        <div class="max-w-1500px w-[100%] mx-auto flex flex-wrap justify-center mt-50px gap-30px">
            <button class="rounded-xl overflow-hidden" @click="clickLink('https://www.paypal.com/donate?hosted_button_id=PMZEYH8NSYU9G', true, 'Donate To BroJenuel')">
                <span class="text-size-24px font-600">Debit/Credit</span>
                <img src="./../../assets/images/donate.png" alt="" width="400" />
            </button>
            <button class="rounded-xl overflow-hidden">
                <img
                    src="./../../assets/images/gcash.jpg"
                    @click="clickLink('https://i.ibb.co/kJGg32y/GCash-My-QR-06102021230745.png', true, 'Donate To BroJenuel')"
                    alt=""
                    width="325"
                />
            </button>
        </div>
        <hr class="my-40px opacity-30" />
        <div class="max-w-700px w-[100%] mx-auto">
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
<script lang="ts">
import { ipcRenderer } from "electron";
import { defineComponent } from "vue";
import { NAlert } from "naive-ui";
export default defineComponent({
    components: { NAlert },
    setup() {
        return {
            clickLink: (link: string, newWindow: false, title: "Believers Sword App") => {
                let params: any = { link };
                params.title = title;
                if (newWindow) params["windowed"] = true;
                ipcRenderer.send("clickExternalLink", params);
            },
        };
    },
});
</script>
