function savePositionsInStorage() {
  const { lat, lng, zoom } = getLatLongZoom();
  localStorage.setItem("lat", lat);
  localStorage.setItem("long", lng);
  localStorage.setItem("zoom", zoom);
}

function setUpInitalStorage() {
  if (
    !localStorage.getItem("lat") ||
    !localStorage.getItem("long") ||
    !localStorage.getItem("zoom")
  ) {
    localStorage.setItem("lat", "-21");
    localStorage.setItem("long", "-50");
    localStorage.setItem("zoom", "9");
  }
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

  // console.log(link);
  if (document.getElementById("lat"))
    document.getElementById("lat").value = lat;
  if (document.getElementById("long"))
    document.getElementById("long").value = lng;
  if (document.getElementById("zoom"))
    document.getElementById("zoom").value = zoom;
  if (document.getElementById("link"))
    document.getElementById("link").value = link;
}

function fitMap() {
  const sizeMapInnerHeight = window.innerHeight;
  const sizeMapInnerWidth = window.innerWidth; 
  document.getElementById("googleMap").style.height = sizeMapInnerHeight + "px";
  document.getElementById("googleMap").style.width = sizeMapInnerWidth + "px";
}

function eventFitMap() {
  window.addEventListener("resize", function () {
    fitMap();
  });
}

function getUrlParams(){
  const latLongZoom = new getUrlVal(["lat", "long", "zooml"]);
  // let { lat, long, zooml } = 
  return latLongZoom.get_list();
}

function getInputSearchMapMemoryOrUrl(aa){
  const {lat,long,zooml} = aa
  let latitude;
  let longitude;
  let zoom;

  if ((lat, long, zooml)) {
    latitude = lat;
    longitude = long;
    zoom = Number(zooml);
    window.location.search = "";
  } else {
    latitude = localStorage.getItem("lat");
    longitude = localStorage.getItem("long");
    zoom = Number(localStorage.getItem("zoom"));
  }

  return {
    latitude,
    longitude,
    zoom
  }
}

class getUrlVal {
  lista = null;
  constructor(parametros_url) {
    let lista_parametros_url_resolvidas = {};
    const get = (name) => {
      if (
        (name = new RegExp("[?&]" + encodeURIComponent(name) + "=([^&]*)").exec(
          window.location.search
        ))
      )
        return decodeURIComponent(name[1]);
    };

    parametros_url.forEach((element) => {
      lista_parametros_url_resolvidas[element] = get(element);
    });
    this.lista = lista_parametros_url_resolvidas;
  }

  get_list() {
    return this.lista;
  }
}