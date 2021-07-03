<template>
  <router-link to="/">Home Page</router-link>
  <router-link to="/about">About</router-link>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>