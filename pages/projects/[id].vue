<template>
    <div class="max-h-[80vh]">
        <section class="w-[90%] h-full bg-slate-100 mx-auto grid grid-cols-2 gap-5">
            <article class="aspect-square px-4 py-3">
                <img class="w-full object-cover " :src="project.properties.photo" :alt="project.properties.name">
            </article>
            <article class="px-5 py-4">
                <strong class="text-gray-500">About the Project</strong>
                <h2 class="font-bold text-2xl text-black text-opacity-80">{{ project.properties.name }}</h2>
                <h3 class="font-bold text-red-400 text-opacity-80"> {{ project.properties.budget }}</h3>
                <h4>{{project.properties.county }}</h4>
                <p class="text-sm text-gray-400"> {{ project.properties.about }}</p>
                <p>{{ project.properties.phase }}</p>
                <p>{{ project.properties.project_type }}</p>
                <p v-if="project.likes_count === 1">{{ project.likes_count }} person has liked this project</p>
                <p v-if="project.likes_count > 1">{{ project.likes_count }} persons have like this project</p>
                

            </article>
        </section>
    </div>
</template>

<script setup>
import {useProjects} from "~/store/project"

const ProjectStore = useProjects()
const id = useRoute().params.id

// states
const project = ref(null)
const data = await ProjectStore.getProject(id)
project.value = data.value

watch(() => ProjectStore.likedProjects, async () => {
    const data = await ProjectStore.getProject(id)
    project.value = data.value
})

    
</script>

<style scoped>

</style>