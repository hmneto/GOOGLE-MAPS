class SavePoint {
  test() {
    //if(!value2send) return
    var shownVal = document.getElementById("answer").value;
    var value2send = document.querySelector(
      "#answers option[value='" + shownVal + "']"
    );

    if (!value2send) return;

    console.log(value2send.dataset.value);
  }
}
