let map;
function myMap() {

  let { lat, long, zooml } = getUrlParams()


  const {
    latitude,
    longitude,
    zoom
  } = getInputSearchMapMemoryOrUrl(lat, long, zooml);

  var mapProp = {
    center: getLatLngMaps(latitude, longitude),
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
  //let infoWindow = new google.maps.InfoWindow({});
  let point = new google.maps.Marker({ })
  map.addListener("click", function (mapsMouseEvent){
    const { lat, lng } = mapsMouseEvent.latLng.toJSON();
    //infoWindow.close();
    infoWindow = new google.maps.InfoWindow({ position: mapsMouseEvent.latLng });
    infoWindow.setContent(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    //infoWindow.open(map);
    point.setMap(null);
    point = createMark(getLatLngMaps(lat,lng), 'https://i.imgur.com/ZWJeURC.jpg')
    point.setMap(map);

  });
}

function createMark(position, icon){
  return new google.maps.Marker({
    position,
   // icon,
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

function getLatLngMaps(lat,lng){
return new google.maps.LatLng(
  parseFloat(lat),
  parseFloat(lng)
);
}

function goToLatLngMap(lat,lng,zoom) { 
  const latLng = getLatLngMaps(lat,lng)

  map.panTo(latLng);
  map.setZoom(Number(zoom));
}