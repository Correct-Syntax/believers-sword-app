<template>
    <div
        class="
            flex
            justify-between
            w-full
            fixed
            items-center
            bg-gray-50 bg-opacity-70
            z-[90]
            h-[var(--nav-height)]
            shadow-md
            backdrop-filter backdrop-blur-sm
        "
    >
        <div class="nav-logo">
            <img
                src="./../../assets/images/logo.png"
                alt="logo"
                class="h-[80px] pl-[20px]"
            />
        </div>
        <div class="h-full">
            <ul class="flex h-full p-[5px] gap-[10px]">
                <li class="h-full flex justify-center items-center w-[70px]">
                    <router-link to="/bible">
                        <button>Bible</button>
                    </router-link>
                </li>
                <li class="h-full flex justify-center items-center w-[70px]">
                    <router-link to="/sermons">
                        <button>Sermons</button>
                    </router-link>
                </li>
                <li class="h-full flex justify-center items-center w-[70px]">
                    <router-link to="/store">
                        <button>Store</button>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="pr-[20px]">
            <NSpace align="center">
                <div>Account</div>
                <MoreButton />
            </NSpace>
        </div>
    </div>
</template>
<script lang="ts" src="./Header.ts" />
