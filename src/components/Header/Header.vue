<template>
    <div class="navigation-header">
        <div class="nav-logo">
            <img src="./../../assets/images/logo.png" alt="logo" height="80" />
        </div>
        <div class="navigation">
            <ul>
                <li>
                    <router-link to="/bible">
                        <button>Bible</button>
                    </router-link>
                </li>
                <li>
                    <router-link to="/sermons">
                        <button>Sermons</button>
                    </router-link>
                </li>
                <li>
                    <router-link to="/store">
                        <button>Store</button>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="nav-account">
            <NSpace align="center">
                <div>Account</div>
                <MoreButton />
            </NSpace>
        </div>
    </div>
</template>
<script lang="ts" src="./Header.ts" />
<style lang="scss" src="./Header.scss" />
