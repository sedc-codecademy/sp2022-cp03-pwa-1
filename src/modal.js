const swiper1 = document.getElementById("swiper");
const modal = document.getElementById("modal-sign-in");
const modalSingUp = document.getElementById("modal-sign-up");
const singUp = document.getElementById("sign-up")

// privremeno kolku da funcionira za demoto
const navBar = document.querySelector(".nav-container");
const arrowPrev = document.querySelector(".swiper-button-prev");
const arrowNext = document.querySelector(".swiper-button-next");
navBar.style.display = "none";
arrowPrev.style.display = "none";
arrowNext.style.display = "none";



const exits = document.querySelectorAll('#modal-exit');

exits.forEach(function(exit) {
    exit.addEventListener('click', function(event) {
        event.preventDefault();
        modal.classList.remove('open');
        swiper1.classList.remove('z-index')
            //  privremeno kolku da funcionira za demoto 
        navBar.style.display = "flex";
        arrowPrev.style.display = "flex";
        arrowNext.style.display = "flex";
    });
})

singUp.addEventListener('click', function(event) {
    modalSingUp.classList.add('open')
    modal.classList.remove('open')
})