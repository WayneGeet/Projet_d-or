<template>
    <div>
        <p>Welcome {{ user.first_name }}</p>
        <div v-if="projects">
            <section class="" v-for="project in projects" :key="project.id">
                <h2 class="">{{ project.properties.name }}</h2>
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
    middleware:"auth"
})
const authStore = useAuth()
const ProjectStore = useProjects()

const projects = ref(null)
const user = ref({})

onMounted(async ()=> {
    const person = await authStore.getUser()
    user.value = await person.value
    const data = await ProjectStore.getProjects()
    const prjs = data.value
    projects.value = prjs.features
    ProjectStore.$subscribe((cb) => console.log(cb))
    authStore.$subscribe((cb) => console.log(cb.events, " this is from authStore subscriber"))

})


setInterval(async () => {
    const {data} = await useFetch("/api/refresh/", {
  async onResponseError({ request, response, options }) {
    // Log error
    console.log(
      "[fetch response error]",
      request,
      response.status    );
  },
})
    const message = data.value
    console.log(message, ' this is from the interceptor @index.vue')
}, 10000)



// projects.value = prjs.features


</script>

<style lang="scss" scoped>

</style>