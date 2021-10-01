<template>
    <div class="games-selection gap-20px">
        <div
            v-for="game in games"
            :key="game.title"
            class="flex flex-row gap-10px p-10px border dark:border-gray-700 border-gray-300 rounded-lg items-center dark:hover:bg-gray-700 hover:bg-gray-300 select-none"
        >
            <div class="min-w-100px max-w-300px w-[100%]">
                <img :src="require(`@/assets/images/games_logo/${game.logo}`)" />
            </div>
            <div class="flex flex-col gap-10px">
                <h1 class="font-700 text-size-27px">{{ game.title }}</h1>
                <p>{{ game.description }}</p>
                <router-link to="/qna">
                    <button class="px-15px py-5px bg-gray-800 rounded-lg hover:bg-[var(--primaryColor)] font-24px font-800 w-[100%] text-gray-200">Play</button>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    setup() {
        return {
            games: [
                {
                    title: "Question and Answer",
                    logo: "qna.png",
                    path: "/qna",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias, debitis? Aspernatur sapiente ad maxime nobis. Ipsum adipisci facere odit fugit distinctio voluptatem illum, porro, repudiandae fugiat quis obcaecati architecto aliquid.",
                },
            ],
        };
    },
});
</script>
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