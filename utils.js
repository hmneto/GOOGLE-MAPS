function savePositionsInStorage(lat, long, zoom) {
  localStorage.setItem("lat", lat);
  localStorage.setItem("long", long);
  localStorage.setItem("zoom", zoom);
}

let _latMax, _latMin, _longMax, _longMin;
function centerMap(zoom, dist, map) {
  // console.log(map.getCenter().lat())

  let latMax;
  let latMin;
  let longMax;
  let longMin;

  let retorno_dados;

  if (getZoomMap() >= zoom) {
    latMax = Math.round(getCenterLatMap() - dist);
    latMin = Math.ceil(getCenterLatMap() + dist);
    longMax = Math.round(getCenterLongMap() - dist);
    longMin = Math.ceil(getCenterLongMap() + dist);

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
