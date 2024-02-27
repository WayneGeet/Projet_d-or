<template>
    <div>
        <div ref="mapRef" id="map" class="h-[90vh]">
        </div>
      </div>
</template>

<script setup>
import { useProjects } from "~/store/project"
import {useMap} from "~/store/map";
const MapStore = useMap()
  definePageMeta({
    middleware:'auth'
  })
  const mapRef = ref(null)

  onMounted(async () => {
      await ProjectStore.getProjects()
      const prjs = ProjectStore.projects
      const options = {
          center:{lat:-0.03, lng:37.23},
          zoom:5,
          mapId:"b2d1489d9fcc06c8"
        }
      // map
      const map = new window.google.maps.Map(mapRef.value, options)
      prjs.map((project) => {
        

      })

      const markerZero = new window.google.maps.marker.AdvancedMarkerElement({
        map:map, 
        position:map.getCenter()
      })
      console.log(markerZero)




  })   
  

  // set marker color
  function setMarkerColor(location){
      if(location.features.properties.phase === "planning") return "red"
      else if(location.features.properties.phase === "execution") return "purple"
      else if(location.features.properties.phase === "initial") return "orange"
      else if(location.features.properties.phase === "closing") return "black"
  }
  const popupImage = (location) => {
    if(!location.properties.photo){
      return "~/assets/images/shop.png"
    }
    else return location.properties.photo
  }
  const ProjectStore = useProjects()
  const locations = ref(null)
  const properties = ref(null)
  const control = ref({
    lng:37.9098765789,
    lat:0.0234567658,
    zoom:8
  })
    
</script>

<style scoped>
.popup{
  max-width:5rem;
  overflow:scroll;
  height:7rem;

}

</style>