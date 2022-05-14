<script lang="ts" setup>
import { NEmpty } from "naive-ui";
import { useRouter } from "vue-router";
import { Layers } from "@vicons/carbon";
import RenderIcon from "@/components/RenderIcon/RenderIcon.vue";

const router = useRouter();
const games: Array<any> = [
    {
        title: "Memory Flip Card",
        icon: Layers,
        path: "/memory-cards",
        description: "This is an exciting game, were you create your own flip cards to challenge your memory, and to practice your recalling ability.",
    },
];
const selectGame = (path: string) => {
    localStorage.setItem("pathRoute", path);
    router.push(path);
};
</script>

<template>
    <div v-if="games" class="games-selection gap-20px">
        <div
            v-for="game in games"
            :key="game.title"
            class="flex flex-row gap-10px p-20px border dark:border-gray-700 border-gray-300 rounded-lg items-center dark:hover:bg-gray-700 hover:bg-gray-300 select-none"
        >
            <div>
                <img v-if="game.logo" :src="require(`@/assets/images/games_logo/${game.logo}`)" />
                <div v-if="game.icon" class="text-size-100px">
                    <RenderIcon :icon="game.icon" />
                </div>
            </div>
            <div class="flex flex-col gap-10px justify-between w-[100%] h-[100%] pr-10px">
                <div>
                    <h1 class="font-700 text-size-27px pb-10px">{{ game.title }}</h1>
                    <p>{{ game.description }}</p>
                </div>
                <div @click="selectGame(`${game.path}`)">
                    <button class="px-15px py-5px bg-gray-800 rounded-lg hover:bg-[var(--primaryColor)] font-24px font-800 w-[100%] text-gray-200">Play</button>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="max-w-500px w-[100%] mx-auto pt-50px">
        <NEmpty> Games Are Still Being Developed. When its done, it will be added here. </NEmpty>
    </div>
</template>

<style lang="postcss">
.games-selection {
    display: grid;
    grid-template-columns: 100%;
}

@media only screen and (min-width: 746px) {
    .games-selection {
        grid-template-columns: 47.5% 47.5%;
    }
}

@media only screen and (min-width: 1345px) {
    .games-selection {
        grid-template-columns: 1fr 1fr 1fr;
    }
}

@media only screen and (min-width: 1642px) {
    .games-selection {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
}
</style>
