let map;
function myMap() {

  let { lat, long, zooml } = getUrlParams()


  const {
    latitude,
    longitude,
    zoom
  } = getInputSearchMapMemoryOrUrl(lat, long, zooml);

  var mapProp = {
    center: new google.maps.LatLng(latitude, longitude),
    zoom: zoom,
    mapTypeId: google.maps.MapTypeId.HYBRID,
  };
  map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

function eventDragMap() {
  map.addListener("drag", MontaDados);
}

function eventZoomMap() {
  map.addListener("zoom_changed", MontaDados);
}

function eventClickMap() {
  let infoWindow = new google.maps.InfoWindow({});
  map.addListener("click", function (mapsMouseEvent){
    const { lat, lng } = mapsMouseEvent.latLng.toJSON();
    infoWindow.close();
    infoWindow = new google.maps.InfoWindow({ position: mapsMouseEvent.latLng });
    infoWindow.setContent(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    infoWindow.open(map);
  });
}

function getZoomMap() {
  return map.getZoom();
}

function getCenterLatMap() {
  return map.getCenter().lat().toFixed(6);
}

function getCenterLngMap() {
  return map.getCenter().lng().toFixed(6);
}

function getLatLongZoom() {
  return {
    lat: getCenterLatMap(),
    lng: getCenterLngMap(),
    zoom: map.getZoom(),
  };
}


function goToLatLngMap(lat,lng,zoom) { 
  const latLng = new googleMaps.LatLng(
    parseFloat(lat),
    parseFloat(lng)
  );

  map.panTo(latLng);
  map.setZoom(Number(zoom));
}