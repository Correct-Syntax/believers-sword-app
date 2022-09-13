<script lang="ts" setup>
import MyFeedBacks from "./MyFeedBacks.vue";
import {
    NButton,
    NModal,
    NCard,
    NInput,
    NForm,
    NFormItem,
    FormInst,
    NSelect,
    NTabs,
    NTabPane,
    useNotification,
} from "naive-ui";
import RenderIcon from "./../../Icon/Icon.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useUserStore } from "@/store/user";
import { supabase } from "@/service/SupaBase/supabase";
import dayjs from "dayjs";

const showModal = ref(false);
const feedbackFormRef = ref<FormInst | null>(null);
const isLoading = ref(false);
const router = useRouter();
const store = useStore();
const userStore = useUserStore();
const notification = useNotification();

const form = ref({
    title: null,
    category: null,
    description: null,
});

const formRule = {
    title: {
        required: true,
        message: "Please enter a title",
        trigger: "blur",
    },
    description: {
        required: true,
        message: "Please enter a description",
        trigger: "blur",
    },
    category: {
        required: true,
        message: "Please enter a category",
        trigger: ["blur", "change"],
    },
};

async function submitFeedBack() {
    // feedbackFormRef.value?.validate((errors) => {
    //     if (!errors) {
    //         isLoading.value = true;
    //         addFeedback(form.value).then((res) => {
    //             console.log(res);
    //             isLoading.value = false;
    //         });
    //     }
    // });
    const { data, error } = await supabase.from("feedbacks").insert({
        title: form.value.title,
        category: form.value.category,
        content: form.value.description,
        user_id: userStore.session?.user.id,
    });

    if (error) {
        notification.error({
            title: "Oops! Their is an Error.",
            content: error.message,
            meta: dayjs().format("MMM DD, YYYY"),
        });
        return;
    }

    console.log(data);
    notification.success({
        title: "Success!",
        content: "Your Feedback is submitted successfully.",
        meta: dayjs().format("MMM DD, YYYY"),
    });
    resetForm();
}

function resetForm() {
    form.value.title = null;
    form.value.category = null;
    form.value.description = null;
}
function closeModal() {
    showModal.value = false;
    form.value.title = null;
    form.value.category = null;
    form.value.description = null;
}

async function selectRoute(path: string) {
    store.state.showUnRoutePage = "false";
    localStorage.setItem("pathSelected", path);
    localStorage.setItem("UnRoutePageSelected", "false");
    closeModal();
    await router.push(path);
}
</script>
<template>
    <NButton size="tiny" icon round tertiary @click="showModal = !showModal">
        <template #icon>
            <RenderIcon size="15" name="feedback" />
        </template>
        <span class="capitalize">{{ $t("feedback") }}</span>
    </NButton>
    <NModal :show="showModal">
        <NCard title="Feedback" class="max-w-300px" size="small">
            <template #header-extra>
                <NButton size="tiny" icon round tertiary @click="closeModal()"> {{ $t("close") }} </NButton>
            </template>
            <NTabs>
                <NTabPane :name="$t('add_feedback')" :tab="$t('add_feedback')">
                    <NForm
                        v-if="userStore.isUserLogged"
                        ref="feedbackFormRef"
                        size="small"
                        :rules="formRule"
                        :model="form"
                    >
                        <NFormItem label="Select Category" path="category">
                            <NSelect
                                v-model:value="form.category"
                                placeholder="Select Category"
                                :options="[
                                    {
                                        label: 'Bug',
                                        value: 'bug',
                                    },
                                    {
                                        label: 'Feature',
                                        value: 'feature',
                                    },
                                    {
                                        label: 'Other',
                                        value: 'other',
                                    },
                                ]"
                            />
                        </NFormItem>
                        <NFormItem label="Enter Summary of Feedback" path="title">
                            <NInput v-model:value="form.title" />
                        </NFormItem>
                        <NFormItem label="Enter more details" path="description">
                            <NInput
                                v-model:value="form.description"
                                type="textarea"
                                placeholder="Please Enter Description"
                            />
                        </NFormItem>
                        <NButton
                            :disabled="isLoading"
                            :loading="isLoading"
                            @click="submitFeedBack"
                            type="primary"
                            round
                        >
                            Submit
                        </NButton>
                    </NForm>
                    <div v-else>
                        <p>Please login to submit feedback</p>
                        <NButton type="primary" @click="selectRoute('/account')">{{ $t("login") }}!</NButton>
                    </div>
                </NTabPane>
                <NTabPane
                    v-if="userStore.isUserLogged"
                    name="my feedbacks"
                    tab="My Feedbacks"
                    display-directive="show:lazy"
                >
                    <MyFeedBacks />
                </NTabPane>
            </NTabs>
        </NCard>
    </NModal>
</template>
