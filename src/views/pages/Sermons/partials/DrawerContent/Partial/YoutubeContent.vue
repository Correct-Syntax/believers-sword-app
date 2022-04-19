<script lang="ts" setup>
import { NButton } from "naive-ui";
import { YoutubeVue3 } from "youtube-vue3";
import { onMounted, reactive, ref } from "vue";
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";

const store = useStore();
const selectedSermonContent = computed(() => store.state.sermonState.selected_sermon);
const youtube: any = ref(null);

const play = reactive({
    video_id: null,
    loop: 1,
});

function playCurrentVideo() {
    youtube.value.player.playVideo();
}
function stopCurrentVideo() {
    youtube.value.player.stopVideo();
}
function pauseCurrentVideo() {
    youtube.value.player.pauseVideo();
}
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
    <div class="text-center">
        <YoutubeVue3
            v-if="play.video_id"
            class="ml-auto mr-auto"
            ref="youtube"
            :videoid="play.video_id"
            :loop="play.loop"
            :controls="1"
            :width="820"
            :height="500"
            @ended="onEnded"
            @paused="onPaused"
            @played="onPlayed"
        />
        <div class="flex gap-5px justify-center">
            <NButton @click="playCurrentVideo">Play</NButton>
            <NButton @click="stopCurrentVideo">Stop</NButton>
            <NButton @click="pauseCurrentVideo">Pause</NButton>
        </div>
    </div>
</template>
