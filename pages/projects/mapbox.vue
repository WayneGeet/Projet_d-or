<template>
    <div>
        <div ref="mapbox" class="h-screen"></div>
    </div>
</template>

<script setup>
const mapbox = ref(null)
onMounted(() => {
mapboxgl.accessToken = "pk.eyJ1Ijoid2F5bmUtZ2VldCIsImEiOiJjbGtjZWlnOXQwMmRiM2twZG05b2VldmcyIn0.93DilXpZMzPqgn_C7Y7L3w"
mapboxgl.Map = new mapboxgl.Map({
    container:mapbox.value,
    style: 'mapbox://styles/mapbox/streets-v9',
    projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
    zoom: 1
})
})


</script>

<style scoped>

</style>