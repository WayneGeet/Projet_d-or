<template>
  <div>
    <h2>{{ error.statusCode }}</h2>
    <button @click="handleError">Refresh</button>
  </div>
</template>

<script setup >

const props = defineProps(["error"])

const handleError = () => clearError({ redirect: '/projects' })
</script>
