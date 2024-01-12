<template>
    <div class="max-h-full">
        <article class="w-[90%] bg-slate-100 mx-auto grid grid-cols-2">
            <!-- {{ project.id }} -->
            <!-- {{ project.name }} -->
            Welcome to Details
        </article>
    </div>
</template>

<script setup>
import {useProjects} from "~/store/project"
import {useAuth} from "~/store/auth"
// states
const project = ref(null)

onMounted(async () => {
    const ProjectStore = useProjects()
    const AuthStore = useAuth()
    const id = useRoute().params.id
    console.log(id, "these are params")

    const data = await ProjectStore.getProject(id)
    console.log(data.value, "from id")
    project.value = data.value
    // console.log(project.value)
    ProjectStore.$subscribe((cb) => console.log(cb))
    AuthStore.$subscribe((cb) => console.log(cb.events, " this is from authStore subscriber"))

})
</script>

<style lang="scss" scoped>

</style>