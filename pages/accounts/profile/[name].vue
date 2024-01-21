<template>
    <main v-if="user_profile">
        <section class="mx-10 max-h-[60vh] shadow-sm 
        shadow-gray-300 pt-[5rem] pb-20">
            <article class="grid grid-cols-2 max-w-lg m-auto">
                <div class="rounded-full ">
                    <img class="rounded-full mx-auto w-36 h-36 object-cover" :src="'http://127.0.0.1:8000/'+user_profile.photo" :alt="user_profile.first_name">
                </div>
                <div class="flex flex-col gap-4">
                    <menu class="flex flex-col gap-3 justify-center">
                        <li class="flex items-center"><p class="font-bold text-4xl text-black text-opacity-80">{{ user_profile.first_name }}_{{ user_profile.last_name[0] }}</p></li>
                        <li class="text-gray-500">{{ user_profile.county }}</li>
                        <li v-if="user_profile.phone_number">0{{ user_profile.phone_number }}</li>
                    </menu>
                    <Nuxt-Link to="/accounts/profile/get-started" class=" text-center block outline px-3 py-2 outline-gray-100 rounded-md hover:bg-black hover:bg-opacity-80
                     transition-colors text-sm duration-300 hover:outline-gray-200 hover:text-white text-black">
                        Edit Profile
                    </Nuxt-Link>
                </div>
            </article>
        </section>
        
    </main>
    
</template>

<script setup>
import { useProjects } from '~/store/project';
const ProjectStore = useProjects()
const profile = await ProjectStore.getProfile()

definePageMeta({
    middleware:"auth",
    layout:"start",
    validate:async (route) => {
        const ProjectStore = useProjects()
        const profile = await ProjectStore.getProfile()
        const {first_name, last_name} = profile.value
        if(route.params.name === `${first_name}_${last_name[0]}`) return true
        else false
    }
})

// status
const user_profile = ref(undefined)
user_profile.value = profile.value
console.log(user_profile)
</script>

<style scoped>

</style>