<template>
    <div class="bg-slate-100 overflow-hidden min-h-screen px-5 py-5">
        <p>Welcome </p>
        <section class="">
            
            <div v-if="projects" class="grid-custom">
                <article
                    class="relative bg-white w-full shadow-md shadow-gray-400 rounded-md overflow-hidden"
                    v-for="project in projects"
                    :key="project.id"
                    >
                    <div @click.stop="likeFn(project)" class="cursor-pointer absolute z-10 left-3 top-3">
                        <div v-if="ProjectStore.likedProjects.includes(project.id)" class="rounded-full bg-slate-100 p-2 text-center bg-opacity-70">
                        <IconesHeartLike/>
                        </div>
                        <div v-else class="rounded-full bg-slate-100 p-2 text-center bg-opacity-70">
                        <IconesHeart/>
                        </div>
                    </div>
                    <div @click="navigateTo(`/projects/${project.id}/`)">
                        <Post
                        :name="project.properties.name"
                        :location="project.properties.county"
                        :photo="project.properties.photo"
                        :phase="project.properties.phase"
                        :budget="project.properties.budget"
                        :project_type="project.properties.project_type"
                        />
                    </div>
                    </article>

            </div>
            <h2 v-else>No projects</h2>
        </section>
    </div>
</template>

<script setup>
import {useProjects} from "~/store/project";
import {useAuth} from "~/store/auth";
import { setData } from 'nuxt-storage/local-storage';
// import { accessandrefresh } from "~/utils/auth";
const authStore = useAuth()
definePageMeta({
    layout:"default",
    middleware:"auth",
    title:"projects"
})
// states
const projects = ref(null)
const ProjectStore = useProjects()

onBeforeMount( async () => {
    await ProjectStore.getProjects()   
    const prjs = ProjectStore.projects
    projects.value = prjs?.features
    await ProjectStore.getLikedProjects()
    console.log("liked projects from index", ProjectStore.likedProjects)
    
    // console.log("accessandrefreshtoken", accessandrefresh())
    
})

watch([() => ProjectStore.filterValue, () => ProjectStore.likedProjects], async (oldValue, newValue) => {
    await ProjectStore.getProjects()
    const prjs = ProjectStore.projects
    projects.value = prjs?.features
}, {deep:true})
// methods

const likeFn = async (post) => {
    const data = await ProjectStore.likeFn(post.id)
    console.log(data.message, " this is the message from likeFn")
    await ProjectStore.getProject(post.id)
    if(data.message === "You have disliked this project"){
        ProjectStore.likedProjects = ProjectStore.likedProjects.filter(i => i !== post.id)
        console.log(ProjectStore.likedProjects, " removed the project's id")
        setData("liked", ProjectStore.likedProjects, 15, "d")
        return 
    }
    else
    {
        ProjectStore.likedProjects = [...ProjectStore.likedProjects, post.id]
        setData("liked", ProjectStore.likedProjects, 15, "d")
        console.log(ProjectStore.likedProjects, " added the user's like")
        return null
    }
}

</script>

<style scoped>
.grid-custom {
    display:grid;
    grid-template-columns:repeat(auto-fill, minmax(15rem, 1fr));
    gap:0.7rem;
}
</style>