<template>
    <div class="relative p-50px qanda-game">
        <NPopconfirm @positive-click="goBack()" placement="bottom-end">
            <template #trigger>
                <button class="top-0 right-0 absolute p-10px rounded-md dark:bg-gray-700 hover:dark:bg-[var(--primaryColor)] bg-gray-300 hover:bg-[var(--primaryColor)]">
                    Exit Game
                </button>
            </template>
            Are you sure you want to Exit?
        </NPopconfirm>
        <div v-show="!startGame" class="max-w-800px w-[100%] mx-auto flex flex-col items-center">
            <h1 class="text-size-60px font-700">Quiz Game</h1>
            <div class="flex flex-col gap-30px mt-50px">
                <div class="game-button bg-emerald-500" @click="Play()">Play</div>
                <div class="game-button bg-light-blue-600">Ranking</div>
            </div>
        </div>
        <div v-show="startGame" class="max-w-800px w-[100%] mx-auto flex flex-col items-center">
            <div class="my-20px font-700 text-size-30px">Question Lorem ipsum dolor sit ?</div>
            <div class="question-option-wrapper">
                <div><div>Question a</div></div>
                <div><div>Question a</div></div>
                <div><div>Question a</div></div>
                <div><div>Question a</div></div>
                <div><div>Question a</div></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { NPopconfirm } from "naive-ui";

export default defineComponent({
    components: { NPopconfirm },
    setup() {
        const router = useRouter();
        const startGame = ref(true);
        const Play = () => (startGame.value = true);

        return {
            startGame,
            Play,
            goBack: () => {
                router.go(-1);
            },
        };
    },
});
</script>
<style lang="scss">
.qanda-game {
    .game-button {
        @apply w-300px px-30px py-15px text-size-30px text-gray-50 font-800 rounded-md cursor-pointer relative text-center select-none;
        &:before {
            content: "";
            background-color: rgba(0, 0, 0, 0.1);
            @apply rounded-md duration-100 absolute top-0 left-0 h-[100%] w-[100%];
        }
        &:hover {
            &:before {
                background-color: rgba(0, 0, 0, 0);
            }
        }
        &:active {
            &:before {
                background-color: rgba(255, 255, 255, 0.542);
            }
        }
    }

    .question-option-wrapper {
        @apply flex flex-wrap w-[100%] gap-10px;

        & > * {
            flex: 1 1 300px;
            @apply flex justify-center;
            & > * {
                @apply bg-[#3498DB] px-15px py-15px rounded-md w-[100%] text-size-20px text-center font-600 cursor-pointer text-gray-50 hover:bg-[#2581bf];
            }
        }
    }
}
</style>