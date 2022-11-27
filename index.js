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

openView("MapPage");

function SavePointInteraction(){
  const savePoint = new SavePoint()
  window.savePointGlobal = savePoint

  const { lat, lng } = window.googleMapsGlobal.get()

  console.log(lat.toFixed(6),lng.toFixed(6))
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


const icones = [
  {
    link:'https://i.imgur.com/ZWJeURC.jpg',
    pointName: 'KM'
  }
]