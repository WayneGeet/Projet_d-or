<template>
    <div>
        <Mapbox title="Welcome to Map View" :control="control" style="position: absolute; top: 0; bottom: 0;">
          <div class="flex flex-col text-2xl text-black absolute top-0 right-5 z-20 text-center items-center justify-center">
          <div @click="() => zoomControl('add')" class="hover:bg-gray-100 cursor-pointer font-bold w-5 h-5 border bg-white p-3 text-center mb-1 flex justify-center items-center">
            <p><IconesAdd/></p>
          </div>
          <div @click="() => zoomControl('minus')" class="hover:bg-gray-100 cursor-pointer font-bold w-5 h-5 border bg-white p-3 text-center mb-1 flex justify-center items-center">
            <p><IconesMinus/></p>
          </div>
        </div>

          <article v-for="location in locations" :key="location.id">
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

        </article>
        </Mapbox> 
        Hello
      </div>
</template>

<script setup>
import { useProjects } from "~/store/project"
    const ProjectStore = useProjects()
    const locations = ref(null)
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


    onMounted(async () => {
        const projects = await ProjectStore.getProjects()
        const prjs = projects.value
        locations.value = prjs.features
    })

    const mapRef = useMapboxRef("map1");
    
    
  const handleMarkerClick = (i)=> {
    console.log(`marker ${i} has been clicked`)
  }
</script>

<style scoped>


</style>