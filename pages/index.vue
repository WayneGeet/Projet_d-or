<template>
    <NuxtLink to="/">Welcome to Proje D'ior!</NuxtLink>
</template>

<script setup>
definePageMeta({
    middleware:"auth"
})

</script>