class SavePoint {
  test() {
    //if(!value2send) return
    var shownVal = document.getElementById("answer").value;
    var value2send = document.querySelector(
      "#answers option[value='" + shownVal + "']"
    );

    if (!value2send) return;

    return value2send.dataset.value
  }

  save(){
    pontos.push({
        namePoint:document.getElementById('namePoint').value,
        lat: document.getElementById('Latitude').value,
        lng: document.getElementById('Longitude').value,
        link: this.test()
    })

    openView("MapPage");
  }
}
