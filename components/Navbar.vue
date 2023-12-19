<template>
    <section>
        <nav class="w-full bg-neutral-100 gap-4 px-4 py-2">
            <ul class="flex justify-between items-center">
                <li>
                    <NuxtLink to="/">LOGO</NuxtLink>
                </li>
                <li v-if="!user" class="bg-red-400 text-white px-3 py-1 rounded-md">
                    <NuxtLink to="/accounts/register">Register</NuxtLink>
                </li>
                <li v-else @click="handleLogout" class="border border-blue-700 text-black px-3 py-1 rounded-md">
                    <NuxtLink to="/accounts/login/">Logout</NuxtLink>
                </li>
            </ul>
        </nav>
    </section>
</template>

<script setup>
import {useAuth} from "~/store/auth.js"
import { storeToRefs } from "pinia";

const AuthStore = useAuth()
AuthStore.$subscribe(()=> console.log(event))
const {user} = storeToRefs(AuthStore)

console.log(user.value, " from navbar")

watch(() => user, () => {
    console.log(user.value, "user has changed do something!")
} )

const handleLogout = async () => {
    await AuthStore.unAuthenticate()
    await navigateTo("/accounts/login/")
}


</script>