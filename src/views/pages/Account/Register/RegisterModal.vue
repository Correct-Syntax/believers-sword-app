<script setup lang="ts">
import { NModal, NCard } from "naive-ui";
import { ref } from "vue";
import RegisterForm from "./Register.vue";

const showModal = ref(false);

defineExpose({
    toggleModal: () => {
        showModal.value = true;
    },
});
</script>
<template>
    <NModal v-model:show="showModal">
        <NCard style="width: 600px" :bordered="false" size="huge" role="dialog" aria-modal="true">
            <RegisterForm @cancelClicked="showModal = false" />
        </NCard>
    </NModal>
</template>
