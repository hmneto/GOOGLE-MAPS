class SavePoint {
  test() {
    var shownVal = document.getElementById("answer").value;
    var value2send = document.querySelector(
      "#answers option[value='" + shownVal + "']"
    ).dataset.value;

    console.log(shownVal, value2send);
  }
}
