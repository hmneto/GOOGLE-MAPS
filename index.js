async function MontaDados() {
  savePositionsInStorage(map.getCenter().lat(),map.getCenter().lng(),map.getZoom())
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
}

function secondTabInteraction() {
  myMap();
  eventDragMap()
  eventClickMap()
}
