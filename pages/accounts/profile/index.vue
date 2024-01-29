<template>
    <section class="mx-auto max-w-2xl min-h-[100vh]">
        <form method="POST" class="text-slate-900 grid gap-10 w-full px-7 py-5 items-start justify-center" @submit.prevent="handleSubmit">
            <article class="flex flex-col gap-5 items-start justify-center">
                <div class="w-full">
                    <label for="phone_number" class="text-sm">Phone Number</label>
                    <input class="w-full px-3 py-2 border-b outline-none border-300 focus:shadow-sm focus:shadow-gray-100 focus:border-gray-400" type="text" id="phone_number" v-model="phone_number">
                </div>
                <div class="w-full">
                    <label for="county" class="text-sm">County</label>
                    <input required class="w-full px-3 py-2 border-b outline-none border-300 focus:shadow-sm focus:shadow-gray-100 focus:border-gray-400" type="text" id="county" v-model="county">
                </div>
                <div class="w-full">
                    <label for="" class="text-sm">Profile Photo</label>
                    <input class="w-full px-3 py-2 border-b outline-none border-300 focus:shadow-sm focus:shadow-gray-100 focus:border-gray-400" 
                    type="file" @change="handlePhotoUpload" id="photo">
                </div>
            </article>

            <button type="submit" class="bg-blue-400 rounded-md w-full px-4 py-2">Create</button>
        </form>
    </section>
</template>

<script setup>
import { useProjects } from '~/store/project';
import {useAuth} from "~/store/auth"
definePageMeta({
    middleware:"auth",
    layout:"start"
})

const ProjectStore = useProjects()
const authStore = useAuth()
// states
const phone_number = ref("")
const county = ref("")
const photo = ref("")
// methods
const handlePhotoUpload = (event) => {
    photo.value = event.target.files[0]
}
const handleSubmit = async () => {
    const fd = new FormData()
    fd.append("phone_number", phone_number.value)
    fd.append("county", county.value)
    fd.append("photo", photo.value) 
    const responseData = await ProjectStore.updateProfile(fd)
    console.log(responseData)
    navigateTo("/projects/")
}
</script>

<style scoped>
    input[type="file"]::file-selector-button { 
        background: orangered;
        color: white;
        border: 1px solid orangered;
        border-radius: 5px;
        padding: 1rem 3rem;
        cursor:pointer;
    } 

</style>