<template>
    <NCard class="post-item-card">
        <h2>Title Right Here</h2>
        <div>Contributed by Brian Bill on Apr 3, 2005</div>
        <div
            style="
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                gap: 5px;
                color: grey;
            "
        >
            <NRate allow-half size="small" readonly :value="3.5" />
            <small>based on 5 ratings | 1,145 views today</small>
        </div>
        <div>
            <i style="opacity: 0.6"
                >We’re quick to see what we can’t do and quick to talk about
                what we don’t have. The disciples saw the crowds and realized
                their inadequacy.</i
            >
            <a v-if="isWeb" href="/posts/view/3">
                <NButton text> ...Read More</NButton>
            </a>
            <NButton v-else text @click="$router.push('/sermons/view/2')">
                ...Read More</NButton
            >
        </div>
        <div>Scripture: Mark 6:37</div>
        <div>
            <NSpace>
                <NTag type="info"> #Faith </NTag>
                <NTag type="info"> #Eat </NTag>
                <NTag type="info"> #Beliefs </NTag>
            </NSpace>
        </div>
    </NCard>
</template>
<script src="./PostItem.ts" lang="ts" />
