async function MontaDados() {
  mapaPage.savePositionsInStorage();
  mapaPage.setPositionsInInputs();
  const centro = mapaPage.centerMap(8, 2);
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
  } else if (content === "MapaPage") {
    secondTabInteraction();
  }
}

openView("MapaPage");

function secondTabInteraction() {
  mapaPage.setUpInitalStorage();
  googleMaps.myMap();
  googleMaps.eventDragMap();
  googleMaps.eventZoomMap();
  googleMaps.eventClickMap();
  mapaPage.fitMap();
  mapaPage.eventFitMap();
  MontaDados();
}