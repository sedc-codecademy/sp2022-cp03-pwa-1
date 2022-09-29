// DOM Elements

let getStartedButton = document.querySelector(".hero-btn");
let mainPage = document.querySelector(".main-page");
let html = document.querySelector("html");

// Vars

let swiperSlides = [];
let header;

// Func for creating HTML DOM Elements

let createElements= (initObj)=> {
    var element = document.createElement(initObj.Tag);
    for (var prop in initObj) {
        if (prop === "childNodes") {
            initObj.childNodes.forEach(function (node) { node.appendChild(element); });
        }
        else if (prop === "attributes") {
            initObj.attributes.forEach(function (attr) { element.setAttribute(attr.key, attr.value) });
        }
        else element[prop] = initObj[prop];
    }
    return element;
};

getStartedButton.addEventListener("click", function() {
    mainPage.classList.toggle("hidden");
    html.classList.toggle("htmlSet");
    let appLogIn = createElements({Tag: "div", classList: "appLogIn", childNodes: [html]});
    let leftDiv = createElements({Tag: "div", classList: "sliderShow", childNodes: [appLogIn]});
    let swiperForLogIn = createElements({Tag: "div", classList: "swiper-log-in", childNodes: [leftDiv]});
    let swiperWrapper = createElements({Tag: "div", classList: "swiper-wrapper log-in-wrapper", childNodes: [swiperForLogIn]});
    const swiperPagination = createElements({Tag: "div", classList: "swiper-pagination",childNodes: [leftDiv]})

    

    for(let i = 0; i < 4; i++) {
        swiperSlides.push(createElements({Tag: "div", classList: "swiper-slide slides-log-in", childNodes: [swiperWrapper]}));
    };

    for(let i = 0; i < swiperSlides.length; i++) {
        swiperSlides[1].innerHTML = "I have changed!";
    };
    
   const logInSwiper = new Swiper('.swiper-log-in', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        keyboardControl: true,
        grabCursor: false,
        centeredSlides: true,
        slidesPerView: 'auto',
        initialSlide: 0,
        allowTouchMove: true,
        speed: 800,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 7000,
        },
        effect: 'fade',
        coverflowEffect: {
            rotate: 0,
            slideShadows: false,
            depth: 3500,
            
        },
    });
})



