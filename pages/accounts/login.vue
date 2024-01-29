<template>
    <section class="mx-auto max-w-2xl min-h-[100vh]">
        <form method="POST" class="grid gap-10 w-full px-7 py-5 items-start justify-center" @submit.prevent="login">
            <div class="text-red-400 text-sm" v-if="error">{{ error }}</div>
            <article class="flex flex-col gap-5 items-start justify-center">
                <div class="w-full">
                    <label for="email" class="text-[#0a0908] ">Email</label>
                    <input class="w-full px-3 py-2 rounded-lg outline outline-blue-500 outline-opacity-40" type="text" id="email" v-model="email">
                </div>
                <div class="w-full">
                    <label for="password" class="text-[#0a0908] ">Password</label>
                    <input class="w-full px-3 py-2 rounded-lg outline outline-blue-500 outline-opacity-40" type="password" id="password" v-model="password">
                </div>
            </article>

            <button type="submit" class="bg-blue-400 rounded-md w-full text-white px-4 py-2">login</button>
        </form>
    </section>
</template>

<script setup>
definePageMeta({
    layout:"start",
})
import { useAuth } from '~/store/auth';
const authStore = useAuth()
const error = ref("")
const email = ref("")
const password = ref("")

async function login() {
    try {
        const tokens = await authStore.setAuthentication({email:email.value, password:password.value})
        console.log(tokens, " htis is the message from set auth")
        if(tokens.detail){
            error.value=tokens.detail
            return
        }
        else await navigateTo(`/projects/`)  
    } catch (error) {
        error.value = error
        console.log(error, ' from login catch')
    }

    // $bus.$emit("auth-event", isAuthenticated)
}    

// nuxtStorage.localStorage.setData('access_token1', );

</script>