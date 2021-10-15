<template>
    <div class="py-100px h-[100%] overflow-y-auto overflowing-div">
        <DonateComponent :textWidth="700" />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import DonateComponent from "@/components/Donate/Donate.vue"

export default defineComponent({
    components: { DonateComponent }
})
</script>
