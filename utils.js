function savePositionsInStorage() {
  const { lat, lng, zoom } = getLatLongZoom();
  localStorage.setItem("lat", lat);
  localStorage.setItem("long", lng);
  localStorage.setItem("zoom", zoom);
}

let _latMax, _latMin, _longMax, _longMin;
function centerMap(zoom, ditancia) {
  let latMax;
  let latMin;
  let longMax;
  let longMin;

  let retorno_dados;

  if (getZoomMap() >= zoom) {
    latMax = Math.round(getCenterLatMap() - ditancia);
    latMin = Math.ceil(getCenterLatMap() + ditancia);
    longMax = Math.round(getCenterLngMap() - ditancia);
    longMin = Math.ceil(getCenterLngMap() + ditancia);

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
      lat: getCenterLatMap(),
      lng: getCenterLngMap(),
    };
  else return null;
}

function setPositionsInInputs() {
  const { lat, lng, zoom } = getLatLongZoom();
  const link = `${window.location}?lat=${lat}&long=${lng}&zooml=${zoom}`;

  if (document.getElementById("lat"))
    document.getElementById("lat").value = lat;
  if (document.getElementById("long"))
    document.getElementById("long").value = lng;
  if (document.getElementById("zoom"))
    document.getElementById("zoom").value = zoom; 
  if (document.getElementById("link"))
    document.getElementById("link").value = link;
}