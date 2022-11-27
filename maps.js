class GoogleMaps {
  myMap() {
    let { lat, long, zooml } = mapaPage.getUrlParams();

    const { latitude, longitude, zoom } = mapaPage.getInputSearchMapMemoryOrUrl(
      lat,
      long,
      zooml
    );

    var mapProp = {
      center: this.getLatLngMaps(latitude, longitude),
      zoom: zoom,
      mapTypeId: google.maps.MapTypeId.HYBRID,
    };
    this.map = new google.maps.Map(
      document.getElementById("googleMap"),
      mapProp
    );
  }

  eventDragMap() {
    this.map.addListener("drag", MontaDados);
  }

  eventZoomMap() {
    this.map.addListener("zoom_changed", MontaDados);
  }

  getLatLngMaps(lat, lng) {
    return new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
  }

  createMark(position, icon) {
    return new google.maps.Marker({ position, icon });
  }

  getZoomMap() {
    return this.map.getZoom();
  }

  getCenterLatMap() {
    return this.map.getCenter().lat().toFixed(6);
  }

  getCenterLngMap() {
    return this.map.getCenter().lng().toFixed(6);
  }

  getLastLatLngClick() {
    const { lat, lng } = this.latLgn;
    return {
      lat: lat.toFixed(6),
      lng: lng.toFixed(6),
    };
  }

  eventClickMap() {
    let point = new google.maps.Marker({});
    this.map.addListener("click", (mapsMouseEvent) => {
      this.latLgn = mapsMouseEvent.latLng.toJSON();

      const { lat, lng } = this.latLgn
      point.setMap(null);
      point = this.createMark(
        this.getLatLngMaps(lat, lng),
        //'https://i.imgur.com/ZWJeURC.jpg'
      );
      point.setMap(this.map);

      let infoWindow = new google.maps.InfoWindow({});
      point.addListener("click", () => {
        infoWindow.close();
        infoWindow = new google.maps.InfoWindow({
          position: mapsMouseEvent.latLng,
        });
        infoWindow.setContent(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        infoWindow.open(this.map, point);
        //console.log(this.getLastLatLngClick());
      });
    });
  }



  getLatLongZoom() {
    return {
      lat: this.getCenterLatMap(),
      lng: this.getCenterLngMap(),
      zoom: this.map.getZoom(),
    };
  }

  goToLatLngMap(lat, lng, zoom) {
    const latLng = this.getLatLngMaps(lat, lng);

    this.map.panTo(latLng);
    this.map.setZoom(Number(zoom));
  }
}
const googleMaps = new GoogleMaps();
