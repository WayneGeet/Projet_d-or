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
                    <input class="w-full px-3 py-2 border-b outline-none border-300 focus:shadow-sm focus:shadow-gray-100 focus:border-gray-400" type="text" id="county" v-model="county">
                </div>
                <div class="w-full">
                    <label for="" class="text-sm">Profile Photo</label>
                    <input class="w-full px-3 py-2 border-b outline-none border-300 focus:shadow-sm focus:shadow-gray-100 focus:border-gray-400" 
                    type="file"  id="photo">
                </div>
            </article>

            <button type="submit" class="bg-blue-400 rounded-md w-full px-4 py-2">Create</button>
        </form>
    </section>
</template>

<script setup>
import { useProjects } from '~/store/project';
definePageMeta({
    middleware:"auth"
})

const ProjectStore = useProjects()
// states
const phone_number = ref("")
const county = ref("")
const dp = ref("")

// methods
const handlePhotoUpload = (event) => {
    dp.value = event.target.files[0]
}
const handleSubmit = async () => {
    const fd = new FormData()
    fd.append("phone_number", phone_number.value)
    fd.append("county", county.value)
    fd.append("dp", dp.value)
    const data = await ProjectStore.setProfile(fd)   
    console.log(data) 
    // navigateTo("/projects/")
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