async function MontaDados(mapPage, googleMaps) {
  mapPage.savePositionsInStorage(googleMaps);
  mapPage.setPositionsInInputs(googleMaps);
  const centro = mapPage.centerMap(8, 2,googleMaps);
  if (!centro) return;
  //console.log(centro);
}

function openView(page) {
  fetch(`pages/${page}.html`)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      document.getElementById("content").innerHTML = data;
      addInteraction(page);
    })
    .catch((error) => {
      console.log(error);
    });
}

function addInteraction(content) {
  if (content === "SavePoint") {
    SavePointInteraction()
  } else if (content === "MapPage") {
    MapPageInteraction();
  }
}

openView("SavePoint");

function SavePointInteraction(){
  console.log('here')
}

function MapPageInteraction() {
  const mapPage = new MapPage();
  const googleMaps = new GoogleMaps();
  window.mapPageGlobal = mapPage
  window.googleMapsGlobal = googleMaps

  mapPage.setUpInitalStorage();
  googleMaps.myMap(mapPage);
  googleMaps.eventDragMap(mapPage,googleMaps);
  googleMaps.eventZoomMap(mapPage,googleMaps);
  googleMaps.eventClickMap();
  mapPage.fitMap();
  mapPage.eventFitMap();
  MontaDados(mapPage,googleMaps);
}