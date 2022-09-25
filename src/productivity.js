// Selectors
const container = document.querySelector(".productivity-container");

// Custom CreateElement Function

let createElement= (initObj)=> {
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

// Search Box CreateElements

let searchBoxWrap = createElement({Tag: "div", classList: "wrap", childNodes: [container]});
let inputTextFieldDiv = createElement({Tag: "div", classList: "search", childNodes: [searchBoxWrap]});
let inputTextField = createElement({Tag: "input", classList: "searchTerm", placeholder: "Search articles", attributes: [{key: "type", value: "text"}], childNodes: [inputTextFieldDiv]});
let submitButton = createElement({Tag: "button", classList: "searchButton", attributes: [{key: "type", value: "submit"}], innerHTML: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>`, childNodes: [inputTextFieldDiv]});

// Swiper CreateElements

let swiperForArticles = createElement({Tag: "div", classList: "swiper-popular-articles gallery-articles", childNodes: [container]});
let swiperWrapper = createElement({Tag: "div", classList: "swiper-wrapper", childNodes: [swiperForArticles]});
let swiperSlide;
let pngWrapper;
let textHeadline;
let innerTextHeadline;

// Loop for CreateElements swiper-slides

for(let i = 0; i < 20; i++) {
    swiperSlide = createElement({Tag: "div", classList: "swiper-slide", childNodes: [swiperWrapper]});
    pngWrapper = createElement({Tag: "div", classList: "png-wrapper", childNodes: [swiperSlide]});
    textHeadline = createElement({Tag: "div", classList: "text-headline", childNodes: [swiperSlide]});
    innerTextHeadline = createElement({Tag: "h2", childNodes: [textHeadline]});
};

// Initializing Swiper

const galleryArticles = new Swiper('.gallery-articles' , { 
    direction: 'horizontal',
    loop:  true,
    nested: true,
    loopedSlides: 3,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    initialSlide: 3,
    allowTouchMove: true,
    keyboardControl: true,
    speed: 600,
    spaceBetween: 13,
  });

  

 