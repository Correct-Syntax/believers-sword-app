<script lang="ts" setup>
import { sermonCollection } from "@/service/FireBase/FireBaseService";
import { NEmpty } from "naive-ui";
import { onMounted } from "vue";
import { getDocs, limit, orderBy, query, startAt } from "firebase/firestore/lite";

onMounted(async () => {
    // const sermonSnapShot = await getDocs(sermonCollection);
    const sermonSnapShot = query(sermonCollection, orderBy("title"), startAt(0), limit(2));
    const documentSnapshots = await getDocs(sermonSnapShot);
    const cityList = documentSnapshots.docs.map((doc) => doc.data());
    console.log(cityList);
});
</script>
<template>
    <div class="h-[100%] flex justify-center items-center">
        <NEmpty description="Sermons Page" size="huge">
            <template #icon>
                <i class="bx bx-traffic-cone"></i>
            </template>
            <template #extra>
                <div class="w-[100%] max-w-[300px]">
                    Hi! This Page is Under Contraction and It will come soon.
                    <div>I just want to let you know that this page, is were you can see or post sermons to share to the community.</div>
                </div>
            </template>
        </NEmpty>
    </div>
</template>
