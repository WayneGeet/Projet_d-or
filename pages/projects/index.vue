<template>
    <div class="bg-slate-100 overflow-hidden min-h-screen px-5 py-5">
        <p>Welcome </p>
        <section class="">
            <div v-if="projects" class="grid-custom">
                <article @click="navigateTo(`/projects/${project.id}`)" class="bg-white w-full shadow-md shadow-gray-400 rounded-md overflow-hidden" v-for="project in projects" :key="project.id" @dblclick="likeFn(project.id)">
                    <Post :name="project.properties.name" :location="project.properties.county" 
                    :photo="project.properties.photo" :isLiked="()=>likeFn(project.id)" :phase="project.properties.phase" :budget="project.properties.budget" :project_type="project.properties.project_type"/>
                </article>
            </div>
            <h2 v-else>No projects</h2>
        </section>
        

    </div>
</template>

<script setup>
import {useProjects} from "~/store/project";

definePageMeta({
    layout:"default",
    middleware:"auth",
    title:"projects"
})
// states
const projects = ref(null)
const isLiked = ref(undefined)
console.log(isLiked, " this is isLiked")
const ProjectStore = useProjects()

// const user = await ProjectStore.getUser()
// console.log(user)
await ProjectStore.getProjects("")   
const prjs = ProjectStore.projects
projects.value = prjs?.features
watch(() => ProjectStore.filterValue, async (oldValue, newValue) => {
    console.log(oldValue, newValue, ' this watch from index')
    await ProjectStore.getProjects()
    const prjs = ProjectStore.projects
    projects.value = prjs?.features
    console.log(projects.value)
})
// methods
const likeFn = async (id) => {
    const data = await ProjectStore.likeFn(id)
    isLiked.value = data.value.message
    console.log(isLiked.value)
    return data.value.message==="You have liked this post"
}


</script>

<style scoped>
.grid-custom {
    display:grid;
    grid-template-columns:repeat(auto-fill, minmax(15rem, 1fr));
    gap:0.7rem;
}
</style>