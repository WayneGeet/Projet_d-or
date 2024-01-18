<template>
    <div v-if="user_profile">
        <h2>{{ user_profile.county }}</h2>
    </div>
</template>

<script setup>
import { useProjects } from '~/store/project';
const ProjectStore = useProjects()

// status
const user_profile = ref("")
const profile = await ProjectStore.getProfile()
console.log(profile.data, "no data means it's successful")
</script>

<style lang="scss" scoped>

</style>