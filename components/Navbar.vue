<template>
    <section>
        <nav class="w-full bg-neutral-100 gap-4 px-4 py-2">
            <ul class="flex justify-between items-center">
                <li>
                    <NuxtLink to="/">LOGO</NuxtLink>
                </li>
                <li v-if="AuthStore.user" class="bg-red-400 text-white px-3 py-1 rounded-md">
                    <NuxtLink to="/accounts/register">Register</NuxtLink>
                </li>
                <li v-else-if="!AuthStore.user" @click="handleLogout" class="border border-blue-700 text-black px-3 py-1 rounded-md">
                    <NuxtLink to="/accounts/login/">Logout</NuxtLink>
                </li>
            </ul>
        </nav>
    </section>
</template>

<script setup>
import nuxtStorage from "nuxt-storage"
import {useAuth} from "~/store/auth.js"
const AuthStore = useAuth()
const data = AuthStore.isAuthenticated
console.log(data)
console.log(AuthStore.isAuthenticated, " this is from navbar")
const handleLogout = async () => {
    nuxtStorage.localStorage.setData("access", "")
    nuxtStorage.localStorage.setData("refresh", "")
    nuxtStorage.localStorage.setData("user", "")
}


</script>