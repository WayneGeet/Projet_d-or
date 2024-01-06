<template>  
    <div class="w-[100%] h-[80vh] relative">
      <MapboxMap
        map-id="projects"
        style=props.style
        :options="{
            style: 'mapbox://styles/wayne-geet/clk9alnap00oh01qy18um4etm',
            center: [props.control.lng, props.control.lat],
            zoom: props.control.zoom
        }"
      >
        <MapboxGeolocateControl position="top-left" />
        <slot></slot>
      </MapboxMap> 

  </div>
</template>

<script setup>
    const props = defineProps(['control', 'style', 'width', 'height'])
    onMounted(() => {
      const mapRef = useMapboxRef('projects')
      console.log(mapRef.value)
      const mapStyle = computed(() => {
        return mapRef.value?.getStyle();
      });
      console.log(mapStyle, " this is the mapstyle")
      })
    
</script>

<style scoped>
  .custom-pop-up {
    max-width:7rem;
    padding:0.3rem 0.4rem;
    display:flex;
    flex-direction:column;
    
  }
</style>