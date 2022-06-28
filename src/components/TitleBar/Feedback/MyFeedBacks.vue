<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getMyFeedbacks } from "./../../../service/backend/feedback";
import { NSkeleton, NEmpty } from "naive-ui";

const myFeedbacks = ref<Array<any>>([]);
const isLoading = ref(false);

function getMyFeedback() {
    isLoading.value = true;
    getMyFeedbacks()
        .then(({ data }) => {
            isLoading.value = false;
            if (data) myFeedbacks.value = data;
        })
        .catch(() => {
            isLoading.value = false;
        });
}

onMounted(() => {
    if (myFeedbacks.value.length == 0) {
        getMyFeedback();
    }
});
</script>
<template>
    <div v-if="isLoading" class="flex flex-col gap-5px">
        <div class="border border-gray-500 rounded-md p-3" v-for="count in [1, 2]" :key="count"><NSkeleton text :repeat="4" /> <n-skeleton text style="width: 60%" /></div>
    </div>
    <div v-else-if="myFeedbacks.length > 0" class="flex flex-col gap-5px">
        <div class="border border-gray-500 rounded-md p-3" v-for="feedback in myFeedbacks" :key="feedback._id">
            <h1 class="text-size-17px font-800">{{ feedback.title }}</h1>
            <small class="text-size-15px">
                Category: <strong>{{ feedback.category }}</strong>
            </small>
            <div>
                {{ feedback.description }}
            </div>
        </div>
    </div>
    <div v-else class="py-30px">
        <NEmpty description="You don't have any feedback" />
    </div>
</template>
