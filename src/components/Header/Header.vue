<template>
    <div class="navigation-header">
        <div class="nav-logo">Logo</div>
        <div class="navigation">
            <ul>
                <li>
                    <router-link to="/bible">Bible</router-link>
                </li>
                <li>
                    <router-link to="/sermons">Sermons</router-link>
                </li>
                <li>
                    <router-link to="/store">Store</router-link>
                </li>
            </ul>
        </div>
        <div class="nav-account">Account</div>
    </div>
</template>
<script lang="ts" src="./Header.ts" />
<style lang="scss" src="./Header.scss" />
