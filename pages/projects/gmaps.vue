<template>
    <div ref="mapRef" class="h-screen">

    </div>
</template>

<script setup>
const mapRef = ref(null)
onMounted(() => {
    console.log(mapRef.value)
    const map = new window.google.maps.Map(
        mapRef.value,
        {
            center:{lat:-0.03, lng:37.23},
            zoom:6,
            mapId: "b2d1489d9fcc06c8",

        }
    )
    const pinElement = new window.google.maps.marker.PinElement({
      scale: 1.5,
      background: "#FBBC04",
      borderColor: "#137333",
      glyphColor: "yellow",
    });
    const marker = new window.google.maps.marker.AdvancedMarkerElement({
        map, 
        position:map.getCenter(),
        content:pinElement.element
    })
})
</script>

<style scoped>

</style>