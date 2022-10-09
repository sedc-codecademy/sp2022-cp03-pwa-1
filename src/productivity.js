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
let swiperWrapperProductivity = createElement({Tag: "div", classList: "swiper-wrapper", childNodes: [swiperForArticles]});
let swiperSlideProductivity =[];
let pngWrapper =[];
let textHeadline =[];


// Loop for CreateElements swiper-slides

for(let i = 0; i < 13; i++) {
    swiperSlideProductivity.push(createElement({Tag: "div", classList: "swiper-slide swiper-slides-productivity", childNodes: [swiperWrapperProductivity]}));
};

for(let i = 0; i < swiperSlideProductivity.length; i++) {
    pngWrapper.push(createElement({Tag: "div", classList: "png-wrapper", childNodes: [swiperSlideProductivity[i]]}));
    textHeadline.push(createElement({Tag: "div", classList: "text-headline", childNodes: [swiperSlideProductivity[i]]}));
}

// Initializing Swiper

const galleryArticles = new Swiper('.gallery-articles' , { 
    direction: 'horizontal',
    loop:  true,
   
    // loopedSlides: 12,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    initialSlide: 3,
    allowTouchMove: true,
    keyboardControl: true,
    speed: 600,
    spaceBetween: 13,

    on: {

        slideChangeTransitionStart: function(swiper) {
            let $wrapperEl = swiper.$wrapperEl;
            let params = swiper.params;
            $wrapperEl.children(('.' + (params.slideClass) + '.' + (params.slideDuplicateClass)))
                .each(function() {
                    let idx = this.getAttribute('data-swiper-slide-index');
                    this.innerHTML = $wrapperEl.children('.' + params.slideClass + '[data-swiper-slide-index="' + idx + '"]:not(.' + params.slideDuplicateClass + ')').html();
                });
        },

        slideChangeTransitionEnd: function(swiper) {
            swiper.slideToLoop(swiper.realIndex, 0, false);
        }


    }
    
    
  });

  
  
  
// HEADER TO ARTICLES 

textHeadline[0].innerHTML = `<h2>Maintaining healthy habits-in five simple steps</h2>`
textHeadline[1].innerHTML = `<h2>7 Brain Exercises to Strengthen Your Mind</h2>`
textHeadline[2].innerHTML = `<h2>How to build a healthy habits</h2>`
textHeadline[3].innerHTML = `<h2>Healthy snacks</h2>`
textHeadline[4].innerHTML = `<h2>5 must have habits in the office</h2>`
textHeadline[5].innerHTML = `<h2>Working outdoors can boost your productivity</h2>`
textHeadline[6].innerHTML = `<h2>Why to avoid fast food</h2>`
textHeadline[7].innerHTML = `<h2>Stress at work can also contribute to a person becoming depressed</h2>`
textHeadline[8].innerHTML = `<h2>8 Strategies for Dealing With a Difficult Boss</h2>`
textHeadline[9].innerHTML = `<h2>Staying hydrated to boost productivity</h2>`
textHeadline[10].innerHTML = `<h2>11 tips for organization and productivity</h2>`
textHeadline[11].innerHTML = `<h2>7 Tips for a Stress-Free Work Day</h2>`
textHeadline[12].innerHTML = `<h2>Simple tips for achieving goals</h2>`



// IMG TO ARTICLES  

pngWrapper[0].innerHTML = `<img src="vectorsProductivity/newArticles/img (1).png ">`
pngWrapper[1].innerHTML = `<img src="vectorsProductivity/newArticles/img (2).png ">`
pngWrapper[2].innerHTML = `<img src="vectorsProductivity/newArticles/img (3).png ">`
pngWrapper[3].innerHTML = `<img src="vectorsProductivity/newArticles/img (4).png ">`
pngWrapper[4].innerHTML = `<img src="vectorsProductivity/newArticles/img (5).png ">`
pngWrapper[5].innerHTML = `<img src="vectorsProductivity/newArticles/img (6).png ">`
pngWrapper[6].innerHTML = `<img src="vectorsProductivity/newArticles/img (7).png ">`
pngWrapper[7].innerHTML = `<img src="vectorsProductivity/newArticles/img (8).png ">`
pngWrapper[8].innerHTML = `<img src="vectorsProductivity/newArticles/img (9).png ">`
pngWrapper[9].innerHTML = `<img src="vectorsProductivity/newArticles/img (10).png ">`
pngWrapper[10].innerHTML = `<img src="vectorsProductivity/newArticles/img (11).png ">`
pngWrapper[11].innerHTML = `<img src="vectorsProductivity/newArticles/img (12).png ">`
pngWrapper[12].innerHTML = `<img src="vectorsProductivity/newArticles/img (13).png ">`
// pngWrapper[13].innerHTML = `<img src="/vectorsProductivity/newArticles/img (14).png ">`


document.querySelectorAll(".swiper-slides-productivity").forEach((item) => {
    item.addEventListener("click", function (e) {
        const click = e.target.closest(".png-wrapper");
        if (!click) return;


        
        // click.style.border = "5px solid red";
    });
});