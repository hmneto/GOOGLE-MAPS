async function MontaDados() {
  savePositionsInStorage()
  setPositionsInInputs()
  const centro = centerMap(8, 2);
  if (!centro) return;
  console.log(centro);
}

function openView(page){
    fetch(`${page}.html`)
      .then(function(response) {
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
  } else if (content === "second_tab") {
    secondTabInteraction();
  }
}

function secondTabInteraction() {
  setUpInitalStorage()
  myMap();
  eventDragMap()
  eventClickMap();
}
