<template>
    <div>
        <Mapbox title="Welcome to Map View" :onClick="(e)=>console.log(e.lngLat)" :control="control" style="position: relative; top: 0; bottom: 0;" mapId="projects">

          <article v-for="location in locations" :key="location.id">
              <MapboxDefaultMarker
                :options="{color:`${() => setMarkerColor(location)}`}"
                :marker-id="location.id.toString()"
                :lnglat="[location.geometry.coordinates[0], location.geometry.coordinates[1]]"
              >
              <MapboxDefaultPopup
                :popup-id="location.id.toString()"
                :lnglat="[location.geometry.coordinates[0], location.geometry.coordinates[1]]"
                :options="{
                  closeOnClick:true,
                  className:'popup',
                  maxWidth:'250px'
                }"
              >
                <div class="rounded-md border border-sky-400 overflow-y-auto">
                  {{ console.log(popupImage(location)) }}
                  <img class="max-w-[200px] h-[150px] object-contain mx-auto px-2 pb-3" :src="popupImage(location)" :alt="'image of '+ location.properties.name">
                  <div class="px-3">
                    <p class="whitespace-nowrap">{{ location.properties.name }}</p>
                    <p>{{ location.properties.budget }}</p>
                    <p>{{ location.properties.phase }}</p>
                  </div>
                  <button>
                    <NuxtLink to=""></NuxtLink>
                  </button>
                </div>
              </MapboxDefaultPopup>
              </MapboxDefaultMarker>

              

        </article>
        </Mapbox> 
      </div>
</template>

<script setup>
import { useProjects } from "~/store/project"
  definePageMeta({
    middleware:'auth'
  })
  onMounted(async () => {
      const projects = await ProjectStore.getProjects()
      const prjs = projects.value
      locations.value = prjs.features //GIS
      properties.value = prjs.features.properties //data description
      console.log(locations.value)
  })    
  
  const showAlert = () =>{
    console.log("marker has been clicked")
  }
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
  const zoomControl = (val) => {
    if(val === "add" && control.value.zoom <= 12){
      // let {zoom, ...rest} = control.value
      // zoom++
      control.value.zoom++
      console.log(control.value.zoom)
    }
    else if(val === "minus" && control.value.zoom > 0){
      control.value.zoom--
    }
  }
  
    
</script>

<style scoped>
.popup{
  max-width:5rem;
  overflow:scroll;
  height:5rem;

}

</style>