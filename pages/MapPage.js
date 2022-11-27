class MapPage {
  savePositionsInStorage() {
    const { lat, lng, zoom } = googleMaps.getLatLongZoom();
    localStorage.setItem("lat", lat);
    localStorage.setItem("long", lng);
    localStorage.setItem("zoom", zoom);
  }

  setUpInitalStorage() {
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

  _latMax;
  _latMin;
  _longMax;
  _longMin;
  centerMap(zoom, ditancia) {
    let latMax;
    let latMin;
    let longMax;
    let longMin;

    let retorno_dados;

    if (googleMaps.getZoomMap() >= zoom) {
      latMax = Math.round(googleMaps.getCenterLatMap() - ditancia);
      latMin = Math.ceil(googleMaps.getCenterLatMap() + ditancia);
      longMax = Math.round(googleMaps.getCenterLngMap() - ditancia);
      longMin = Math.ceil(googleMaps.getCenterLngMap() + ditancia);

      retorno_dados =
        this._latMax !== latMax ||
        this._latMin !== latMin ||
        this._longMax !== longMax ||
        this._longMin !== longMin;

      if (retorno_dados) {
        this._latMax = latMax;
        this._latMin = latMin;
        this._longMax = longMax;
        this._longMin = longMin;
      }
    }

    if (retorno_dados)
      return {
        lat: googleMaps.getCenterLatMap(),
        lng: googleMaps.getCenterLngMap(),
      };
    else return null;
  }

  setLinkLatLng() {
    const { lat, lng, zoom } = googleMaps.getLatLongZoom();
    const link = `${window.location}?lat=${lat}&long=${lng}&zooml=${zoom}`;

    // console.log(link);

    if (document.getElementById("link"))
      document.getElementById("link").value = link;
  }

  setPositionsInInputs() {
    const { lat, lng, zoom } = googleMaps.getLatLongZoom();

    if (document.getElementById("lat"))
      document.getElementById("lat").value = lat;
    if (document.getElementById("long"))
      document.getElementById("long").value = lng;
    if (document.getElementById("zoom"))
      document.getElementById("zoom").value = zoom;
  }

  fitMap() {
    const sizeMapInnerHeight = window.innerHeight;
    const sizeMapInnerWidth = window.innerWidth;
    document.getElementById("googleMap").style.height =
      sizeMapInnerHeight + "px";
    document.getElementById("googleMap").style.width = sizeMapInnerWidth + "px";
  }

  eventFitMap() {
    window.addEventListener("resize", function () {
      mapaPage.fitMap();
    });
  }

  getUrlParams() {
    const latLongZoom = new getUrlVal(["lat", "long", "zooml"]);
    return latLongZoom.get_list();
  }

  getInputSearchMapMemoryOrUrl(lat, long, zooml) {
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
      zoom,
    };
  }

  goToPosition() {
    googleMaps.goToLatLngMap(
      document.getElementById("lat").value,
      document.getElementById("long").value,
      document.getElementById("zoom").value
    );
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

const mapaPage = new MapPage();
