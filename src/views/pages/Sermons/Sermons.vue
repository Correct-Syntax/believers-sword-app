<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
import { getFireStoreSermons } from "@/service/FireBase/common/Sermons";
import { DrawerPlacement, NDrawer, NDrawerContent } from "naive-ui";
const store = useStore();
const sermons = computed(() => store.state.sermonState.sermons);

const drawerShowContent = ref(false);
const placement = ref<DrawerPlacement>("right");
onMounted(() => {
    if (sermons.value.length > 0) {
        return;
    }
    getFireStoreSermons()
        .then((result) => {
            store.state.sermonState.sermons = result;
        })
        .catch((e) => {
            console.log(e);
        });
});
</script>
<template>
    <div id="drawer-target" class="h-[100%] p-5">
        <NDrawer v-model:show="drawerShowContent" :width="`100%`" :placement="placement" to="#drawer-target">
            <NDrawerContent>
                <template #header>
                    <div>This is the title</div>
                    <div @click="drawerShowContent = false">Close</div>
                </template>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam qui, asperiores dolore incidunt, consectetur blanditiis vel aut maiores esse modi quas molestias
                ullam ducimus officia quae exercitationem provident nihil necessitatibus?
            </NDrawerContent>
        </NDrawer>
        <div class="mb-4">
            <h1 class="text-size-30px font-800">Sermons</h1>
            <p class="text-size-18px max-w-800px">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta deserunt reprehenderit sit saepe officiis pariatur esse numquam accusantium eligendi, laborum
                similique eveniet ipsa quaerat est hic, harum cumque, nam sint.
            </p>
        </div>
        <div class="flex">
            <div v-for="sermon in sermons" :key="sermon.title" class="w-300px cursor-pointer" @click="drawerShowContent = !drawerShowContent">
                <img :src="sermon.thumbnail" alt="" class="w-[100%]" />
                <div>{{ sermon.title }}</div>
                <div>{{ sermon.description }}</div>
            </div>
        </div>
    </div>
</template>
