const navbar = document.getElementById("navbar");
navbar.addEventListener("click", (event) => {
    if (event.target.id !== "navbar") {
        fetch(`/${event.target.id}.html`).then((response) => {
            response.text().then(function (data) {
                document.getElementById("content").innerHTML = data
                addInteraction(event.target.id)
            });

        }).catch((error) => {
            console.log(error)
        });
    }
})

function addInteraction(content) {
    console.log(content)
    if (content === "first_tab") {
        firstTabInteraction();
    } else if (content === "second_tab") {
        secondTabInteraction();
    }
}

function firstTabInteraction() {
    const firstButton = document.getElementById("first_button")
    firstButton.addEventListener("click", (event) => {
        let actualData = document.getElementById("first_data")
        actualData.textContent = +actualData.textContent + 1
    })
}

function secondTabInteraction() {
    const secondButton = document.getElementById("second_button")
    secondButton.addEventListener("click", (event) => {
        let actualData = document.getElementById("second_data")
        actualData.textContent = +actualData.textContent - 1
    })
}