<template>
    <div class="h-[100%] p-20px overflow-y-auto overflowing-div scroll-bar-sm">
        <div class="max-w-700px w-[100%] mx-auto">
            <h1 class="text-size-34px font-700 text-center py-30px">Thank You for Trying This application! 🥰</h1>
        </div>
        <div class="max-w-700px w-[100%] mx-auto flex flex-row items-center gap-15px">
            <div class="w-[50%]">
                Hi! I am
                <span @click="clickLink(`https://jenuelganawed.com`, true, 'Jenuel Oras Ganawed')" class="cursor-pointer hover:underline text-[var(--primaryColor)]">
                    <b>Jenuel Oras Ganawed</b>
                </span>
                or call me Bro Jenuel/Mister J. and I am the creator of this application. As you can see, This app is not fully developed yet, but You can still use some of its
                features to help you study the bible. <br /><br />
                I created this application because I like to create my own application where I can put the features that I like inside a single bible study app, and I am open for
                any suggestions to make the app better. I am also sharing this application to you, <br /><br />
                If you want to <b>Donate</b> to make this application even better, you can donate by clicking the donate button bellow.
            </div>
            <div class="w-[50%]">
                <img class="rounded-md" src="./../../assets/images/me.png" />
            </div>
        </div>
        <div class="flex justify-center mt-50px">
            <button @click="clickLink('https://www.paypal.com/donate?hosted_button_id=PMZEYH8NSYU9G', true, 'Donate To BroJenuel')">
                <img src="./../../assets/images/donate.png" alt="" width="200" />
            </button>
        </div>
        <div class="max-w-700px w-[100%] mx-auto mt-100px">
            <h1 class="text-size-18px font-700">Are you a developer?</h1>
            <p>
                If your a developer and like or love to help in the development, you can pull request this
                <span class="cursor-pointer hover:text-[var(--primaryColor)]" @click="clickLink(`https://github.com/Bible-Projects/believers-sword-app`)"
                    ><b>GITHUB REPOSITORY</b></span
                >, and you can Pull Request, and I will be reviewing your code contributions.
            </p>
            <div class="text-center flex justify-center mt-30px">
                <img src="https://media4.giphy.com/media/lgRNj0m1oORfW/200.gif" alt="" />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { ipcRenderer } from "electron";
import { defineComponent } from "vue";
export default defineComponent({
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
