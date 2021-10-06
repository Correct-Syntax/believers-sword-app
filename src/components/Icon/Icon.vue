<template>
    <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" v-html="getIconPath()"></svg>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import iconPaths from "./icons"

export default defineComponent({
    props: {
        name: {type: String, default: 'book'},
        size: {type: [Number, String], default: 30}
    },
    setup(props) {
        return {
            getIconPath: () => {
                return (iconPaths as any)[props.name]
            }
        }
    },
})
</script>
