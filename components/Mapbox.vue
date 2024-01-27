<template>  
    <div class="w-[100%] h-[80vh] relative">
      <MapboxMap
        :map-id="mapId"
        style=props.style
        :options="{
            style: 'mapbox://styles/wayne-geet/clk9alnap00oh01qy18um4etm',
            center: [props.control.lng, props.control.lat],
            zoom: props.control.zoom
        }"
        @click="onClick()"
      >
        <MapboxGeolocateControl position="top-left" />
        <slot></slot>
      </MapboxMap> 

  </div>
</template>

<script setup>
    const props = defineProps(['control', 'style', 'width', 'height', 'mapId', 'onClick'])
    onMounted(() => {
      const mapRef = useMapboxRef('projects')
      console.log(mapRef.value)
      const mapStyle = computed(() => {
        return mapRef.value?.getStyle();
      });
      })
    // const handleMarkerClick = () => {
    //   console.log("marker clicked")
    // }
    useMapboxMarker('marker1', marker => {
  // Assign the marker instance to the ref
      console.log(marker.value, "useMapboxMarker")
  });

    // const mapClick = (e) => {
    //   console.log(e, "map clicked")
    // }
    
</script>

<style scoped>
  .custom-pop-up {
    max-width:7rem;
    padding:0.3rem 0.4rem;
    display:flex;
    flex-direction:column;
    
  }
</style>