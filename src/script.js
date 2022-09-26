// Swiper

// const menu = ['CALENDAR', 'STATISTICS', 'HOME', 'PRODUCTIVITY', 'REMINDERS']
const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    keyboardControl: true,
    grabCursor: false,
    centeredSlides: true,
    slidesPerView: 'auto',
    initialSlide: 2,
    allowTouchMove: false,
    speed: 600,
});



// Scroll page on refresh

window.onbeforeunload = () => {  
    window.scrollTo(0, 0);  
};

$(document).ready(function(){
    $(window).scroll(function(){
        $(".icon-scroll").css("opacity", 1 - $(window).scrollTop() / $('.icon-scroll').height());
    });
  });

(function($) { "use strict";
// navigation
$('a[data-slide]').click(function(e) {
  e.preventDefault();
  swiper.slideTo($(this).data('slide'));
});
})(jQuery);

window.addEventListener('load',function(){
    document.getElementsByTagName('header')[0].addEventListener('click',function(){
      toggle_menu();
    });
  });

window.addEventListener('scroll',function(){
 header_scroll();
    
});
  
function header_scroll(){
    var my_header = document.getElementsByTagName('header')[0];
    var scroll_height = window.pageYOffset;
    if(scroll_height > 300){
      my_header.className = 'header header-scroll';
      
    }
    else {
      my_header.className = 'header';
    }
  }

function toggle_menu(){
    var menu_bar = document.querySelector('.header ul');
    var btn = document.getElementsByClassName('toggle-btn')[0];
    //btn.innerHTML = '&times;';
    if(document.documentElement.clientWidth <= 768){
    //if(menu_bar.style.display == 'none'){
      if(menu_bar.className == 'display-none-mobile'){
        menu_bar.className = 'display-block';
        menu_bar.style.animation = 'flip 1 0.4s 0s';
        btn.innerHTML = '&times;';
        btn.style.fontSize = '40px';
        btn.style.animation = 'fade 1 0.2s 0s';
      }
      else if(menu_bar.className == 'display-block'){
       menu_bar.className = 'display-none-mobile';
        btn.innerHTML = '&#9776';
        btn.style.fontSize = '30px';
        btn.style.animation = 'top-in-basic 1 0.2s 0s';
      }
   }
  }

  const nav = () => {
    const nav = document.querySelector(".js-nav");
    const navLinks = nav.querySelectorAll(".nav__link");
    const slideRect = nav.querySelector(".nav__slider-rect");
 
    nav.addEventListener("click", (evt) => {
       if (!evt.target.classList.contains("nav__link")) {
          return;
       }
       evt.preventDefault();
 
       navLinks.forEach((item) => {
          item.classList.remove("nav__link_active");
       });
 
       if (!evt.target.classList.contains("nav__link_active")) {
          evt.target.classList.add("nav__link_active");
       }
 
       slideRect.style.transform = `translateX(${evt.target.dataset.transform}%)`;
    });
 };
 nav();
 
 






