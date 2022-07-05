const swiper1 = document.getElementById("swiper");
const swiperNavArrows = document.querySelector(".swiperBarArrows");
const navigationBar = document.querySelector(".nav-container");
const modal = document.getElementById("modal-sign-in");
const modalSingUp = document.getElementById("modal-sign-up");
const singUp = document.getElementById("sign-up")
const exits = document.querySelectorAll('#modal-exit');

exits.forEach(function(exit) {
    exit.addEventListener('click', function(event) {
        event.preventDefault();
        modal.classList.remove('open');
        swiper1.classList.remove('z-index');
        swiperNavArrows.classList.remove('z-index');
        navigationBar.classList.remove('z-index');


    });
})

singUp.addEventListener('click', function(event) {
    modalSingUp.classList.add('open')
    modal.classList.remove('open')
})