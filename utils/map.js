export const createMap = (mapId, options) => {
  const map = new window.google.maps.Map(mapId, options);
  return map;
};

export const createMarker = (map, position) => {
  const advancedMarker = new google.maps.marker.AdvancedMarkerElement({
    map,
    position,
  });
  return advancedMarker;
};
