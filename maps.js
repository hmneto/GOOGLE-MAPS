let map;
function myMap() {
  const latitude = localStorage.getItem("lat");
  const longitude = localStorage.getItem("long");
  const zoom = Number(localStorage.getItem("zoom"));

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


function eventClickMap(){

  //   const myLatlng = { lat: -25.363, lng: 131.044 };

  // Create the initial InfoWindow.
  let infoWindow = new google.maps.InfoWindow({
    // content: "Click the map to get Lat/Lng!",
    // position: myLatlng,
  });

  //infoWindow.open(map);

  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();

    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    );
    infoWindow.open(map);
  });
}

function getZoomMap() {
  return map.getZoom();
}

function getCenterLatMap(){
    return map.getCenter().lat()
}

function getCenterLongMap(){
    return map.getCenter().lat()
}