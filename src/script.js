// Swiper


const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    effect: 'coverflow',
    grabCursor: false,
    centeredSlides: true,
    slidesPerView: 'auto',
    initialSlide: 2,


    coverflowEffect: {
        rotate: 30,
        stretch: 0,
        depth: 1200,
        modifier: 1.2,
        slideShadows: true,
    },

    // Pagination
    pagination: {
        el: '.swiper-pagination',
        transparent: true,


    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',

    },


});

// Timer

let start = document.getElementById('start');
let reset = document.getElementById('finish');

let h = document.getElementById("hour");
let m = document.getElementById("minute");
let s = document.getElementById("sec");

//store a reference to the startTimer variable
let startTimer = null;

start.addEventListener('click', function() {
    //initialize the variable
    function startInterval() {
        startTimer = setInterval(function() {
            timer();
        }, 1000);
    }
    startInterval();
})

reset.addEventListener('click', function() {
    h.value = 0;
    m.value = 0;
    s.value = 0;
    //stop the timer after pressing "reset"
    stopInterval()
})

function timer() {
    if (h.value == 0 && m.value == 0 && s.value == 0) {
        h.value = 0;
        m.value = 0;
        s.value = 0;
    } else if (s.value != 0) {
        s.value--;
    } else if (m.value != 0 && s.value == 0) {
        s.value = 59;
        m.value--;
    } else if (h.value != 0 && m.value == 0) {
        m.value = 60;
        h.value--;
    }
    return;
}

//stop the function after pressing the reset button, 
//so the time wont go down when selecting a new time after pressing reset
function stopInterval() {
    clearInterval(startTimer);
}