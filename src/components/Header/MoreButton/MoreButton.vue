<template>
    <NDropdown
        :options="options"
        placement="bottom-start"
        trigger="click"
        @select="handleSelect"
        class="h-full"
    >
        <NButton
            circle
            text
            color="black"
            class="
                h-full
                flex
                justify-center
                items-center
                w-[var(--nav-icon-width)]
                lmobile:w-[45px]
                hover:bg-gray-200
                rounded-lg
                duration-300
                cursor-pointer
                dark:hover:bg-gray-600
                dark:text-gray-200
            "
        >
            <NIcon size="30">
                <OfficeApps20Regular />
            </NIcon>
        </NButton>
    </NDropdown>
</template>
<script lang="ts" src="./MoreButton.ts" />
