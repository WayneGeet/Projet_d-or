<template>
    <section class="mx-auto max-w-2xl min-h-[100vh]">
        <div v-if="authStore.error" class="text-red-400 text-sm ">
            <p>{{ authStore.error }}</p>
        </div>
        <form method="POST" class="grid gap-10 w-full px-7 py-5 items-start justify-center" @submit.prevent="login">
            <article class="flex flex-col gap-5 items-start justify-center">
                <div class="w-full">
                    <label for="email" class="text-white ">Email</label>
                    <input class="w-full px-3 py-2 rounded-lg outline outline-blue-500 outline-opacity-40" type="text" id="email" v-model="email">
                </div>
                <div class="w-full">
                    <label for="password" class="text-white ">Password</label>
                    <input class="w-full px-3 py-2 rounded-lg outline outline-blue-500 outline-opacity-40" type="text" id="password" v-model="password">
                </div>
            </article>

            <button type="submit" class="bg-blue-400 rounded-md w-full text-white px-4 py-2">login</button>
        </form>
    </section>
</template>

<script setup>
definePageMeta({
    layout:"project",
})
import { useAuth } from '~/store/auth';
const authStore = useAuth()

const email = ref("")
const password = ref("")

async function login() {
    const data = await authStore.setAuthentication({email:email.value, password:password.value})
    if(data) {
        console.log(authStore.tokens)
        await navigateTo(`/projects/`)
    }
    else return
}    


</script>