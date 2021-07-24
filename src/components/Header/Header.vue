<template>
    <NLayoutHeader
        class="
            flex
            justify-between
            w-full
            fixed
            items-center
            z-[90]
            h-[var(--nav-height)]
            bg-opacity-70
            shadow-md
            backdrop-filter backdrop-blur-sm
            lmobile:justify-center
        "
    >
        <div class="nav-logo lmobile:hidden">
            <img
                src="./../../assets/images/logo.png"
                alt="logo"
                class="h-[80px] pl-[20px]"
            />
        </div>
        <div class="h-full">
            <ul class="flex h-full gap-[10px] py-[5px]">
                <NPopover
                    v-for="nav in navigates"
                    :key="nav.title"
                    placement="bottom"
                    trigger="hover"
                >
                    <template #trigger>
                        <router-link :to="nav.route">
                            <li
                                class="
                                    h-full
                                    flex
                                    justify-center
                                    items-center
                                    w-[var(--nav-icon-width)]
                                    lmobile:w-[45px]
                                    hover:bg-gray-200
                                    dark:hover:bg-gray-600
                                    rounded-lg
                                    duration-300
                                    cursor-pointer
                                "
                                :class="{
                                    'text-blue-500': route.path.includes(
                                        nav.route
                                    ),
                                }"
                            >
                                <NIcon size="30" v-html="nav.icon"></NIcon>
                            </li>
                        </router-link>
                    </template>
                    <span> {{ nav.title }} </span>
                </NPopover>
            </ul>
        </div>
        <div class="pr-[20px] lmobile:pr-0 h-full">
            <div
                align="center"
                class="h-full m-0 flex p-[5px] items-center gap-[10px]"
            >
                <NPopover placement="bottom" trigger="hover">
                    <template #trigger>
                        <div
                            class="
                                h-full
                                flex
                                justify-center
                                items-center
                                w-[var(--nav-icon-width)]
                                lmobile:w-[45px]
                                hover:bg-gray-200
                                dark:hover:bg-gray-600
                                rounded-lg
                                duration-300
                                cursor-pointer
                            "
                        >
                            <NIcon size="30">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 20 20"
                                >
                                    <g fill="none">
                                        <path
                                            d="M10 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8zM7 6a3 3 0 1 1 6 0a3 3 0 0 1-6 0z"
                                            fill="currentColor"
                                        ></path>
                                        <path
                                            d="M5.009 11A2.001 2.001 0 0 0 3 13c0 1.691.833 2.966 2.135 3.797C6.417 17.614 8.145 18 10 18c1.855 0 3.583-.386 4.865-1.203C16.167 15.967 17 14.69 17 13a2 2 0 0 0-2-2H5.009zM4 13c0-.553.448-1 1.009-1H15a1 1 0 0 1 1 1c0 1.309-.622 2.284-1.673 2.953C13.257 16.636 11.735 17 10 17c-1.735 0-3.257-.364-4.327-1.047C4.623 15.283 4 14.31 4 13z"
                                            fill="currentColor"
                                        ></path>
                                    </g>
                                </svg>
                            </NIcon>
                        </div>
                    </template>
                    <span> Profile </span>
                </NPopover>
                <MoreButton class="h-full" />
            </div>
        </div>
    </NLayoutHeader>
</template>
<script lang="ts" src="./Header.ts" />
