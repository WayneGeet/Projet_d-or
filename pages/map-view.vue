<template>
    <div>
        <Mapbox width="100%" height="100%" title="Welcome to Map View" :data="locations" style="position: absolute; top: 0; bottom: 0;"/>
        <!-- <article v-for="location in data" :key="location.id">
        <MapboxDefaultMarker
        :options="{
        }"
        :marker-id="location.id.toString()"
        :lnglat="{lng:location.geometry.coordinates[0], lat:location.geometry.coordinates[1]}"
        @click="handleMarkerClick(location.id)"
        >
        <template #marker>
          <button @click="showAlert">Map Button!</button>
        </template>
      </MapboxDefaultMarker>

      <MapboxDefaultPopup
      :popup-id="location.properties.name"
      :lnglat="[location.geometry.coordinates[0], location.geometry.coordinates[1]]"
      :options="{
        className:'custom-pop-up',
        closeButton:false,
        closeOnMove:true
      }"
      >
      <h1 class="test">{{ location.id }}</h1>
            
      </MapboxDefaultPopup>

      </article> -->
      
        
        Hello
    </div>
</template>

<script setup>
import { useProjects } from "~/store/project"
    const ProjectStore = useProjects()
    const locations = ref(null)

    onMounted(async () => {
        const projects = await ProjectStore.getProjects()
        const prjs = projects.value
        locations.value = prjs.features

    })

    const mapRef = useMapboxRef("map1");
    const lng = ref(37.90)
    const lat = ref(0.02)
    
    
  const handleMarkerClick = (i)=> {
    console.log(`marker ${i} has been clicked`)
  }
</script>

<style scoped>


</style>