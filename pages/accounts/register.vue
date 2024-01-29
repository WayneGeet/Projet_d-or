<template>
    <section class="mx-auto max-w-2xl h-screen max-h-screen">
        <form method="POST" class="text-slate-800 grid gap-10 w-full px-7 py-5 items-start justify-center" @submit.prevent="handleRegistration">
            <article class="flex flex-col gap-5 items-start justify-center">
                <div class="w-full">
                    <label for="fname" class="text-sm">First Name</label>
                    <input class="w-full px-3 py-2 border-b outline-none border-300 focus:shadow-sm focus:shadow-gray-100 focus:border-gray-400" type="text" id="fname" v-model="fname" required>
                </div>
                <div class="w-full">
                    <label for="lname" class="text-sm">Last Name</label>
                    <input class="w-full px-3 py-2 border-b outline-none border-300 focus:shadow-sm focus:shadow-gray-100 focus:border-gray-400" type="text" id="lname" v-model="lname" required>
                </div>
                <div class="w-full">
                    <label for="email" class="text-sm">Email</label>
                    <input class="w-full px-3 py-2 border-b outline-none border-300 focus:shadow-sm focus:shadow-gray-100 focus:border-gray-400" type="email" id="email" v-model="email" required>
                </div>
                <div class="w-full">
                    <label for="id_no" class="text-sm">Identification Number</label>
                    <input class="w-full px-3 py-2 border-b outline-none border-300 focus:shadow-sm focus:shadow-gray-100 focus:border-gray-400" type="text" id="id_no" v-model="id_no" required>
                </div>
                <div class="w-full">
                    <label for="password" class="text-sm">Create Password</label>
                    <input class="w-full px-3 py-2 border-b outline-none border-300 focus:shadow-sm focus:shadow-gray-100 focus:border-gray-400" id="password" type="password" v-model="password" required>
                </div>
                
            </article>

            <button type="submit" class="text-white bg-blue-400 rounded-md w-full px-4 py-2 hover:bg-sky-500">Register</button>
        </form>
    </section>
</template>

<script setup>
definePageMeta({
    layout:"start",
})
import {useAuth} from "~/store/auth"

// initialize store
const AuthStore = useAuth()
// states
const fname = ref("")
const lname = ref("")
const email = ref("")
const id_no = ref("")
const password = ref("")

// methods
const handleRegistration = async () => {
    const data = await AuthStore.registration({fname, lname, email, id_no, password})
    if(data.value) navigateTo("/accounts/login")
    console.log(data)
}
</script>

<style scoped>

</style>