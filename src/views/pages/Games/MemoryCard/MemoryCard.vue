<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import GameButton from "@/views/pages/Games/GameComponents/GameButton.vue";
import { NModal, NCard, NInput, NPopconfirm } from "naive-ui";
import { ipcRenderer } from "electron";
import RenderIcon from "@/components/RenderIcon/RenderIcon.vue";
import { DocumentAdd, TrashCan } from "@vicons/carbon";

const activeCard = ref(0);
const showAnswer = ref(false);
const showAddNewFlipCard = ref(false);
const options: Record<string, unknown> | any = reactive({
    flipCards: [],
});

const form = reactive({
    question: "",
    answer: "",
});

const getFlipCards = async () => {
    await ipcRenderer.invoke("getFlipCard").then((flipCardObjects: any) => {
        if (flipCardObjects) {
            const flipCards = Object.entries(flipCardObjects);
            for (const [key, value] of flipCards) {
                let v: any = value;
                options.flipCards.push({
                    ...v,
                    ...{ key: key },
                });
            }
        }
    });
};

onMounted(() => {
    getFlipCards();
});

const addNewFlipCard = () => {
    const key = Date.now();
    const newFlipCard = { key, question: form.question, answer: form.answer };

    if (form.question === "" || form.answer === "" || form.answer.replace(" ", "") === "" || form.question.replace(" ", "") === "") {
        alert("oops, some fields are empty.");
        return;
    }
    ipcRenderer.invoke("addFlipCard", newFlipCard).then((response: any) => {
        if (response) {
            options.flipCards.push(newFlipCard);
            showAddNewFlipCard.value = false;
            form.question = "";
            form.answer = "";
        }
    });
};

const deleteFlipCard = (key: number | string) => {
    ipcRenderer
        .invoke("deleteFlipCard", key)
        .then((deleted: boolean) => {
            if (deleted) {
                let flipCards: Array<any> = options.flipCards;
                let change = flipCards.filter((flipCard: any) => flipCard.key !== key);
                options.flipCards = change;
            }
        })
        .catch((e) => alert(e));
};

const nextCard = () => {
    showAnswer.value = false;
    const activeCount = activeCard.value + 1;
    activeCard.value = options.flipCards.length === activeCount ? options.flipCards.length - 1 : activeCount;
};
const previousCard = () => {
    showAnswer.value = false;
    activeCard.value = activeCard.value === 0 ? 0 : activeCard.value - 1;
};
</script>
<template>
    <div class="h-[100%] overflow-y-auto overflowing-div flex flex-col items-center justify-center">
        <n-modal v-model:show="showAddNewFlipCard">
            <n-card style="width: 600px" :bordered="false" size="small">
                <div>
                    <h1 class="text-size-24px pb-7px">What is the question?</h1>
                    <NInput v-model:value="form.question" placeholder="Write your question here..." />
                </div>
                <div class="mt-15px">
                    <h1 class="text-size-24px pb-7px">Write the answer.</h1>
                    <NInput v-model:value="form.answer" placeholder="Write the answer here ..." />
                </div>
                <div class="flex gap-15px justify-end pt-20px">
                    <GameButton
                        class="border border-opacity-50 dark:border-gray-500 dark:text-gray-50 bg-gray-400 bg-opacity-0 hover:bg-opacity-40 text-gray-700 w-120px text-center"
                        @click="showAddNewFlipCard = false"
                    >
                        Cancel
                    </GameButton>
                    <GameButton class="bg-gray-500 hover:bg-gray-600 text-gray-50 w-120px text-center" @click="addNewFlipCard()"> Add </GameButton>
                </div>
            </n-card>
        </n-modal>
        <div class="py-20px max-w-500px text-center flex items-center gap-20px">
            <div>
                <h1 class="font-700 text-size-27px">Memory Flip Cards</h1>
                <p class="text-size-17px leading-normal">
                    This is an exciting game where you can create your own game. This also helps you for retaining memory or for practicing your recalling system.
                </p>
            </div>
            <div>
                <div
                    class="flex flex-col bg-gray-200 text-gray-900 w-100px h-100px items-center justify-center rounded-md cursor-pointer text-size-20px shadow-md hover:bg-gray-300"
                    @click="showAddNewFlipCard = true"
                >
                    <RenderIcon :icon="DocumentAdd" />
                    <span>Add Flip Card</span>
                </div>
            </div>
        </div>
        <div id="cards-container" class="relative perspect-[1000px] h-300px w-500px max-w-[100]">
            <div
                v-for="(option, index) in options.flipCards"
                :key="index"
                class="card"
                :class="{ active: activeCard === index, left: index < activeCard, right: index > activeCard, 'show-answer': activeCard === index && showAnswer }"
            >
                <div class="inner-card">
                    <div class="inner-card-front relative" @click="showAnswer = true">
                        <span class="font-700">
                            {{ option.question }}
                        </span>
                        <span class="absolute bottom-[7px] text-size-14px">Click The Card To Flip</span>
                        <span @click.stop.prevent>
                            <NPopconfirm trigger="click" placement="bottom" @positive-click="deleteFlipCard(option.key)">
                                <template #trigger>
                                    <div class="absolute top-7px right-7px hover:text-red-400">
                                        <RenderIcon :icon="TrashCan" />
                                    </div>
                                </template>
                                <span>Delete to FlipCard?</span>
                            </NPopconfirm>
                        </span>
                    </div>
                    <div class="inner-card-back" @click="showAnswer = false">
                        <span class="font-500">
                            {{ option.answer }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="navigation flex py-20px items-center gap-10px">
            <GameButton class="bg-gray-500 hover:bg-gray-600 text-gray-50" @click="previousCard()"> Previous </GameButton>
            <div>{{ options.flipCards.length > 0 ? activeCard + 1 : 0 }}/ {{ options.flipCards.length }}</div>
            <GameButton class="bg-gray-500 hover:bg-gray-600 text-gray-50" @click="nextCard()"> Next </GameButton>
        </div>
    </div>
</template>

<style lang="postcss">
.card {
    @apply absolute opacity-0 top-0 left-0 h-[100%] w-[100%];
    font-size: 1.5em;
    transform: translateX(50%) rotateY(-20deg);
    transition: transform 0.4s ease, opacity 0.4s ease;

    &.left {
        transform: translateX(-50%) rotateY(20deg);
    }

    &.active {
        cursor: pointer;
        opacity: 1;
        z-index: 10;
        transform: translateX(0) rotateY(0deg);
    }

    .inner-card-front,
    .inner-card-back {
        backface-visibility: hidden;
        position: absolute;
        border-radius: 10px;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        background: #fff;
    }

    .inner-card {
        @apply shadow-lg text-gray-800;
        border-radius: 10px;
        height: 100%;
        width: 100%;
        position: relative;
        transform-style: preserve-3d;
        transition: transform 0.4s ease;
    }

    .inner-card-front {
        transform: rotateX(0deg);
        z-index: 2;
    }

    .inner-card-back {
        transform: rotateX(180deg);
    }

    &.show-answer .inner-card {
        transform: rotateX(180deg);
    }
}
</style>
