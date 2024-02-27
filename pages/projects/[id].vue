<template>
    <div class="max-h-[80vh]">
        <section class="w-full max-w-4xl py-10 rounded-xl shadow-lg shadow-gray-300 bg-white mx-auto grid grid-cols-2 gap-5">
            <article class="px-4 py-3 overflow-hidden">
                <img class="max-w-full object-cover object-center aspect-square" :src="project.properties.photo" :alt="project.properties.name">
            </article>
            <article class="px-5 py-4 flex flex-col gap-3">
                <div class="flex justify-between items-center ">
                    <h2 class="font-medium text-2xl text-black text-opacity-80">{{ project.properties.name }}</h2>
                    <p class="flex items-center gap-[7px]"><span><IconesHeart/></span>{{ project.properties.likes.length }}</p>
                </div>
                <h3 class="font-bold text-[#EF8354] text-opacity-80"> <span class=" ">Ksh. </span>{{ project.properties.budget }}</h3>
                <h4>{{project.properties.county }}</h4>
                <p class="text-sm text-gray-400"> {{ project.properties.about }}</p>
                <div class="flex items-center justify-between ">
                    <p>{{ project.properties.phase }}</p>
                    <p>{{ project.properties.project_type }}</p>
                </div>

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