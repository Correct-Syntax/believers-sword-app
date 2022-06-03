<script lang="ts" setup>
import { NIcon } from "naive-ui";
import { YoutubeVue3 } from "youtube-vue3";
import { onMounted, reactive, ref, watch } from "vue";
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { LogoYoutube } from "@vicons/carbon";
import { ipcRenderer } from "electron";

const store = useStore();
const selectedSermonContent = computed(() => store.state.sermonState.selected_sermon);
const youtube: any = ref(null);

const play = reactive({
    video_id: null,
    loop: 1,
});

watch(selectedSermonContent, (sermon) => {
    if (sermon) {
        play.video_id = sermon.youtube_video_id;
    }
});

const clickLink = (link: string, newWindow: boolean, title = "Believers Sword App") => {
    let params: any = { link };
    params.title = title;
    if (newWindow) params["windowed"] = true;
    ipcRenderer.send("clickExternalLink", params);
};

// function playCurrentVideo() {
//     youtube.value.player.playVideo();
// }
function stopCurrentVideo() {
    youtube.value.player.stopVideo();
}
// function pauseCurrentVideo() {
//     youtube.value.player.pauseVideo();
// }
function onEnded() {
    console.log("## OnEnded");
    stopCurrentVideo();
}
function onPaused() {
    console.log("## OnPaused");
}
function onPlayed() {
    console.log("## OnPlayed");
}

onMounted(() => {
    if (selectedSermonContent.value.youtube_video_id) {
        play.video_id = selectedSermonContent.value.youtube_video_id;
    }
});
</script>
<template>
    <div class="max-w-820 mx-auto px-50px">
        <div class="relative pb-[75%] h-0px">
            <YoutubeVue3
                v-if="play.video_id"
                class="absolute top-0 left-0 w-[100%] h-[100%]"
                ref="youtube"
                :videoid="play.video_id"
                :loop="play.loop"
                :controls="1"
                :width="800"
                :height="400"
                @ended="onEnded"
                @paused="onPaused"
                @played="onPlayed"
            />
        </div>

        <div class="py-15px">
            <div>
                <h2 class="text-size-20px font-800 flex items-center gap-10px">
                    <NIcon class="text-red-500">
                        <LogoYoutube />
                    </NIcon>
                    {{ selectedSermonContent ? selectedSermonContent.title : "" }}
                </h2>
                <div class="mt-5px">
                    Source:
                    <span class="hover:text-[var(--primaryColor)] cursor-pointer" @click="clickLink(selectedSermonContent.source, false, 'Donate To BroJenuel')">{{
                        selectedSermonContent.source
                    }}</span>
                </div>
                <div class="pt-20px" v-html="selectedSermonContent.description"></div>
            </div>
        </div>
    </div>
</template>
