const sessionMain = document.getElementById("sessionMain");
const sessionCardButtons = document.querySelectorAll(".sessionButtons");
const sessionModals = document.querySelector(".sessionPopUpModals");
const closeButton = document.querySelector(".closeSessionModal");
const overlayDiv = document.querySelector(".sessionOverlayDiv");
const startButton = document.querySelector("#startSessionBtn");


// Modals functionality

const closeModalFunction = function () {
    sessionModals.classList.add("hidden");
    overlayDiv.classList.add("hidden");
}

const openModalFunction = function () {
    sessionModals.classList.remove("hidden");
    overlayDiv.classList.remove("hidden");
}
// console.log(sessionModals);
// console.log(sessionCardButtons.length);
for (let i = 0; i < sessionCardButtons.length; i++) {
    sessionCardButtons[i].addEventListener("click", openModalFunction);
};

closeButton.addEventListener("click", closeModalFunction);

overlayDiv.addEventListener("click", closeModalFunction);

document.addEventListener("keydown", function (e) {
    console.log(e.key);
    if (e.key === "Escape" && !sessionModals.classList.contains("hidden")) {
        closeModalFunction();
    }
});
