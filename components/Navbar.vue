<template>
    <section>
        <nav class="w-full bg-neutral-100 gap-4 px-4 py-2">
            <ul class="menu">
                <li>
                    <NuxtLink to="/">LOGO</NuxtLink>
                </li>
                <li v-if="!user" class="">
                    <NuxtLink to="/accounts/register">Register</NuxtLink>
                </li>
                <li v-else @click="handleLogout" class="">
                    <NuxtLink to="/accounts/login/">Logout</NuxtLink>
                </li>
                <li>
                    <NuxtLink>Frameworks</NuxtLink>
                    <ul class="submenu">
                        <li><NuxtLink>React</NuxtLink></li>
                        <li><NuxtLink>Nuxt</NuxtLink></li>
                        <li><NuxtLink>Django</NuxtLink></li>
                    </ul>
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

<style scoped>
ul {
    margin:0;
    padding:0;
    list-style:none;
}
nav {
    width:100%;
    box-shadow:0 0 10px rgb(0 0 0 / 8%);
}

</style>