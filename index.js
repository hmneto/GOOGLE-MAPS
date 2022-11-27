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
  console.log(pontos)
  const savePoint = new SavePoint()
  window.savePointGlobal = savePoint

  const { lat, lng } = window.googleMapsGlobal.get()
  document.getElementById('Latitude').value = lat.toFixed(6)
  document.getElementById('Longitude').value = lng.toFixed(6)

  let html = ""
  for (let index = 0; index < icones.length; index++) {
    const element = icones[index];
    html += `<option data-value="${element.link}" value="${element.pointName}"></option>`
  }
  document.getElementById("answers").innerHTML = html;
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


const pontos = []