
let map;
function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(51.508742, -0.12085),
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.HYBRID,
  };
  map = new google.maps.Map(
    document.getElementById("googleMap"),
    mapProp
  );

  map.addListener("drag", MontaDados);

  const myLatlng = { lat: -25.363, lng: 131.044 };

  // Create the initial InfoWindow.
  let infoWindow = new google.maps.InfoWindow({
    content: "Click the map to get Lat/Lng!",
    position: myLatlng,
  });

  infoWindow.open(map);

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

async function MontaDados() {
  localStorage.setItem("lat", map.getCenter().lat());
  localStorage.setItem("long", map.getCenter().lng());
  localStorage.setItem("zoom", map.getZoom());
  if (document.getElementById("lat"))
    document.getElementById("lat").value = map
      .getCenter()
      .lat()
      .toFixed(6);
  if (document.getElementById("long"))
    document.getElementById("long").value = map
      .getCenter()
      .lng()
      .toFixed(6);
  if (document.getElementById("zoom"))
    document.getElementById("zoom").value = map.getZoom();
  const link = `${window.location}?lat=${map.getCenter().lat()}&long=${map
    .getCenter()
    .lng()}&zooml=${map.getZoom()}`;
  if (document.getElementById("link"))
    document.getElementById("link").value = link;

  const centro = centerMap(8, 2, map);
  if (!centro) return;
  console.log(centro);
}

document.getElementById("navbar").addEventListener("click", (event) => {
  if (event.target.id !== "navbar") {
    fetch(`${event.target.id}.html`)
      .then((response) => {
        response.text().then(function (data) {
          // console.log(data)
          document.getElementById("content").innerHTML = data;
          addInteraction(event.target.id);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

function addInteraction(content) {
  // console.log(content)
  if (content === "first_tab") {
    firstTabInteraction();
  } else if (content === "second_tab") {
    secondTabInteraction();
  }
}

function firstTabInteraction() {
  const firstButton = document.getElementById("first_button");
  firstButton.addEventListener("click", (event) => {
    let actualData = document.getElementById("first_data");
    actualData.textContent = +actualData.textContent + 1;
  });
}

function secondTabInteraction() {
  myMap();

  // const secondButton = document.getElementById("second_button");
  // secondButton.addEventListener("click", (event) => {
  //   let actualData = document.getElementById("second_data");
  //   actualData.textContent = +actualData.textContent - 1;
  // });
}
