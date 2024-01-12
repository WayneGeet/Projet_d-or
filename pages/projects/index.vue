<template>
    <div>
        <p>Welcome {{ user }}</p>
        <div v-if="projects" class="grid grid-cols">
            <section class="" v-for="project in projects" :key="project.id">
                <article class="outline outline-sky-500 hover:outline-sky-300 bg-slate-300 hover:bg-slate-100
                 max-w-[15rem] w-[15rem]"></article>
                <h2 class="">{{ project.properties.name  }}</h2> <span>{{ project.id }}</span>

            </section>
        </div>
        <h2 v-else>No projects</h2>

    </div>
</template>

<script setup>
import { useAuth } from "~/store/auth";
import {useProjects} from "~/store/project";

import nuxtStorage from "nuxt-storage"
definePageMeta({
    layout:"default",
    middleware:"auth",
    title:"projects"
})
const authStore = useAuth()
const ProjectStore = useProjects()

const projects = ref(null)
const user = ref({})

onMounted(async ()=> {
    user.value = await authStore.user
    const data = await ProjectStore.getProjects()   
    const prjs = data.value
    projects.value = prjs?.features
    ProjectStore.$subscribe((cb) => console.log(cb))
    authStore.$subscribe((cb) => console.log(cb.events, " this is from authStore subscriber"))

})

// projects.value = prjs.features


</script>

<style lang="scss" scoped>

</style>