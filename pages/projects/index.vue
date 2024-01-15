<template>
    <div>
        <p>Welcome </p>
        <div v-if="projects" class="grid grid-cols">
            <section class="" v-for="project in projects" :key="project.id" @dblclick="likeFn(project.id)">
                <article class="outline outline-sky-500 hover:outline-sky-300 bg-slate-300 hover:bg-slate-100
                 max-w-[15rem] w-[15rem]"></article>
                <h2 class="">{{ project.properties.name  }}</h2> <span>{{ project.id }}</span>

            </section>
        </div>
        <h2 v-else>No projects</h2>

    </div>
</template>

<script setup>
import {useProjects} from "~/store/project";

definePageMeta({
    layout:"default",
    middleware:"auth",
    title:"projects"
})
const ProjectStore = useProjects()

const projects = ref(null)
const data = await ProjectStore.getProjects()   
const prjs = data.value
projects.value = prjs?.features

// methods
const likeFn = async (id) => {
    const data = await ProjectStore.likeFn(id)
    console.log(data.value)

}



</script>

<style lang="scss" scoped>

</style>