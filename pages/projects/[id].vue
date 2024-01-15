<template>
    <div class="max-h-full">
        <article class="w-[90%] bg-slate-100 mx-auto grid grid-cols-2">
            <!-- {{ project.properties.name }} -->
            {{ project.properties.name }}
            Welcome to Details
        </article>
    </div>
</template>

<script setup>
import {useProjects} from "~/store/project"
import {useAuth} from "~/store/auth"

const ProjectStore = useProjects()
const id = useRoute().params.id

// states
const project = ref(null)
const data = await ProjectStore.getProject(id)
console.log(data?.value, "from id")
project.value = data.value

    
</script>

<style lang="scss" scoped>

</style>