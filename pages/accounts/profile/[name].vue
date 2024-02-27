<template>
    <main class="px-20 mx-auto flex flex-col justify-center gap-10" v-if="user_profile">
        <section class="shadow-sm shadow-gray-300 py-32 flex items-center">
            
            <article class="flex justify-center gap-10 mx-auto items-center max-w-lg">
                <div class="rounded-full w-full">
                    <img class="rounded-full mx-auto w-36 h-36 object-cover" :src="'http://127.0.0.1:8000/'+user_profile.photo" :alt="user_profile.first_name">
                </div>
                <div class="flex flex-col gap-4 w-full">
                    <menu class="flex flex-col gap-3 justify-center">
                        <li class="flex items-center"><p class="font-bold text-4xl text-black text-opacity-80">{{ user_profile.first_name }}_{{ user_profile.last_name[0] }}</p></li>
                        <li class="text-gray-400">{{ user_profile.county }}</li>
                        <li v-if="user_profile.phone_number">0{{ user_profile.phone_number }}</li>
                    </menu>
                    <Nuxt-Link to="/accounts/profile/get-started" class=" text-center block outline px-3 py-2 outline-gray-100 rounded-md hover:bg-black hover:bg-opacity-80
                     transition-colors text-sm duration-300 hover:outline-gray-200 hover:text-white text-black">
                        Edit Profile
                    </Nuxt-Link>
                </div>
            </article>
        </section>

        <section>
            <article class="grid grid-custom">
                <div class="bg-[#ffffff] w-full border-[#eeeff0] border-2 border-dashed h-full rounded-lg flex flex-col items-center justify-center ">
                    <h4 class="font-bold text-2xl">Liked Projects</h4>
                    <p class="">View all your liked projects</p>
                </div>
                <div class="" v-for="project in arr3" :key="project.id">
                    <div v-if="project" @click="navigateTo(`/projects/${project.id}/`)">
                        <Post
                        :name="project.properties.name"
                        :location="project.properties.county"
                        :photo="project.properties.photo"
                        :phase="project.properties.phase"
                        :budget="project.properties.budget"
                        :project_type="project.properties.project_type"
                        />
                    </div>
                </div>
            </article>
            
        </section>
        
    </main>
    
</template>

<script setup>
import { useProjects } from '~/store/project';
const ProjectStore = useProjects()
const profile = await ProjectStore.getProfile()
const liked_projects = ref([])

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

const arr3 = ref([])
onMounted(async () => {
    await ProjectStore.getLikedProjects()
    await ProjectStore.getProjects()
    await ProjectStore.getProfile()
    getPrjs(ProjectStore.projects.features, ProjectStore.likedProjects)
    
    console.log("projects", arr3.value)

    console.log("liked projects", liked_projects)

})

const getPrjs = (arr1, arr2) => {
    arr1.forEach((obj) => {
        if(arr2.includes(obj.id)){
            arr3.value.push(obj)
        }
        else return
    })
}


// status
const user_profile = ref(undefined)
user_profile.value = profile.value
console.log(user_profile)
</script>

<style scoped>
.grid-custom {
    display:grid;
    grid-template-columns:repeat(auto-fill, minmax(15rem, 1fr));
    gap:0.7rem;
}
</style>