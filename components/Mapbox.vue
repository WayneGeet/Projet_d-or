<template>  

    <div class="">
      <MapboxMap
        ref="mapRef"
        map-id="map1"
        style=props.style
        :options="{
            style: 'mapbox://styles/wayne-geet/clk9alnap00oh01qy18um4etm',
            center: [lng, lat],
            zoom: zoom
        }"
      >
        <MapboxGeolocateControl position="top-left" />
      </MapboxMap> 

  </div>
</template>

<script setup>
    const props = defineProps(['lat', 'lng', 'zoom', 'style'])
</script>

<style scoped>
  .custom-pop-up {
    max-width:7rem;
    padding:0.3rem 0.4rem;
    display:flex;
    flex-direction:column;
    
  }
</style>