async function MontaDados(mapaPage, googleMaps) {
  mapaPage.savePositionsInStorage(googleMaps);
  mapaPage.setPositionsInInputs(googleMaps);
  const centro = mapaPage.centerMap(8, 2,googleMaps);
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
  if (content === "first_tab") {
    // firstTabInteraction();
  } else if (content === "MapPage") {
    secondTabInteraction();
  }
}

openView("MapPage");

function secondTabInteraction() {
  const mapaPage = new MapPage();
  const googleMaps = new GoogleMaps();
  window.mapaPageGlobal = mapaPage
  window.googleMapsGlobal = googleMaps

  mapaPage.setUpInitalStorage();
  googleMaps.myMap(mapaPage);
  googleMaps.eventDragMap(mapaPage,googleMaps);
  googleMaps.eventZoomMap(mapaPage,googleMaps);
  googleMaps.eventClickMap();
  mapaPage.fitMap();
  mapaPage.eventFitMap();
  MontaDados(mapaPage,googleMaps);
}