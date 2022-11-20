
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
  map = new google.maps.Map(
    document.getElementById("googleMap"),
    mapProp
  );

  map.addListener("drag", MontaDados);





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



let _latMax, _latMin, _longMax, _longMin;
function centerMap(zoom, dist, map) {
  // console.log(map.getCenter().lat())

  let latMax;
  let latMin;
  let longMax;
  let longMin;

  let retorno_dados;

  if (map.getZoom() >= zoom) {
    latMax = Math.round(map.getCenter().lat() - dist);
    latMin = Math.ceil(map.getCenter().lat() + dist);
    longMax = Math.round(map.getCenter().lng() - dist);
    longMin = Math.ceil(map.getCenter().lng() + dist);

    retorno_dados =
      _latMax !== latMax ||
      _latMin !== latMin ||
      _longMax !== longMax ||
      _longMin !== longMin;

    if (retorno_dados) {
      _latMax = latMax;
      _latMin = latMin;
      _longMax = longMax;
      _longMin = longMin;
    }
  }

  if (retorno_dados)
    return {
      Latitude: map.getCenter().lat(),
      Longitude: map.getCenter().lng(),
    };
  else return null;
}