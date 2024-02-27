import { defineStore } from "pinia";

export const useMap = defineStore("map", () => {
  const map = ref(null);
  const getMap = (mapRef) => {
    map.value = createMap(mapRef, {
      center: { lat: 37.4239163, lng: -122.0947209 },
      zoom: 14,
      mapId: "b2d1489d9fcc06c8",
    });
  };
  return {
    map,
    getMap,
  };
});
