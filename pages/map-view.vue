<template>
    <div>
        <Mapbox title="Welcome to Map View" :control="control" style="position: relative; top: 0; bottom: 0;" mapId="projects">
          <!-- <div class="flex flex-col text-2xl text-black absolute top-0 right-5 z-20 text-center items-center justify-center">
          <div @click="() => zoomControl('add')" class="hover:bg-gray-100 cursor-pointer font-bold w-5 h-5 border bg-white p-3 text-center mb-1 flex justify-center items-center">
            <p><IconesAdd/></p>
          </div>
          <div @click="() => zoomControl('minus')" class="hover:bg-gray-100 cursor-pointer font-bold w-5 h-5 border bg-white p-3 text-center mb-1 flex justify-center items-center">
            <p><IconesMinus/></p>
          </div>
        </div> -->

          <article v-for="location in locations" :key="location.id">
              <MapboxDefaultMarker
                :options="{color:`${() => setMarkerColor(location)}`}"
                :marker-id="location.id.toString()"
                :lnglat="[location.geometry.coordinates[0], location.geometry.coordinates[1]]"
              >
              </MapboxDefaultMarker>

              <MapboxDefaultPopup
                :popup-id="location.id.toString()"
                :lnglat="[location.geometry.coordinates[0], location.geometry.coordinates[1]]"
                :options="{
                  closeOnClick:true
                }"
              >
                <h1 class="test">
                  Hello World!
                </h1>
              </MapboxDefaultPopup>

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


</style>