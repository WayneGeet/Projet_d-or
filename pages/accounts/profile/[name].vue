<template>
    <main v-if="user_profile">
        <section class="grid grid-cols-2">
            {{ console.log(user_profile, " this is user_profile") }}
            <div class="rounded-full">
                <img :src="user_profile.photo" :alt="user_profile.first_name">
            </div>
            <div class="">
                <menu>
                    <li class="flex items-center"><p>{{ user_profile.first_name }}_</p><span>{{ user_profile.last_name[0] }}</span></li>
                </menu>
            </div>
        </section>
        
    </main>
    
</template>

<script setup>
import { useProjects } from '~/store/project';
const ProjectStore = useProjects()
const profile = await ProjectStore.getProfile()

definePageMeta({
    middleware:"auth",
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