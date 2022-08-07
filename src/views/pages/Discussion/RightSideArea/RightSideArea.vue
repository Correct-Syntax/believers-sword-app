<script setup lang="ts">
const ads = [
    {
        image: "https://laracasts.nyc3.cdn.digitaloceanspaces.com/series/thumbnails/modern-javascript-basics.png",
        label: "Modern Javascript Basics",
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    },
];
</script>
<template>
    <div v-for="ad in ads" :key="ad.label" class="p-3 text-center">
        <img class="w-100px mx-auto mb-2" :src="ad.image" />
        <h2 class="font-800">{{ ad.label }}</h2>
        <p>{{ ad.description }}</p>
        <button
            class="text-left px-10px py-9px rounded-xl dark:hover:text-[var(--primaryColor)] text-size-15px dark:bg-blue-100 dark:bg-opacity-5 hover:bg-gray-900 hover:bg-opacity-5 mt-3"
        >
            Click Fore more Details
        </button>
    </div>
</template>
