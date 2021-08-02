<template>
    <header
        id="titlebar"
        class="
            dark:bg-gray-800
            dark:text-gray-100
            text-size-[12px]
            flex
            w-[100%]
            justify-between
            whitespace-nowrap
            h-[var(--header-height)]
        "
    >
        <div class="p-[10px]">Believers Sword</div>
        <div id="drag-region" class="w-[100%] p-[10px]" style="cursor: move;"></div>
        <div class="flex gap-2 p-[10px]">
            <div>min</div>
            <div>max</div>
            <div>close</div>
        </div>
    </header>
</template>
<style lang="scss">
#drag-region {
    -webkit-app-region: drag;
}
</style>