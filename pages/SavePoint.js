class SavePoint {
  getValueFromDataList() {
    var shownVal = document.getElementById("answer").value;
    var value2send = document.querySelector(
      "#answers option[value='" + shownVal + "']"
    );
    if (!value2send) return;
    return value2send.dataset.value
  }

  addPoint(){
    pontos.push({
        namePoint:document.getElementById('namePoint').value,
        lat: document.getElementById('Latitude').value,
        lng: document.getElementById('Longitude').value,
        link: this.getValueFromDataList()
    })
    openView("MapPage");
  }


  builtPage(icones){
    let html = ""
    for (let index = 0; index < icones.length; index++) {
      const element = icones[index];
      html += `<option data-value="${element.link}" value="${element.pointName}"></option>`
    }
    return html
  }

  fillInputsLatLng(){
    const { lat, lng } = window.googleMapsGlobal.get()
    document.getElementById('Latitude').value = lat.toFixed(6)
    document.getElementById('Longitude').value = lng.toFixed(6)
  }
}
