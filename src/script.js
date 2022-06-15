// Swiper

const menu = ['CALENDAR', 'STATISTICS', 'HOME', 'PRODUCTIVITY', 'REMINDERS']
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

    // Pagination a.k.a "the navigation-bar"
    pagination: {
        el: '.swiper-pagination',
        transparent: true,
        clickable: true,
        renderBullet: function(index, className) {
            return '<span class="' + className + '">' + (menu[index]) + '</span>';
        },


    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',

    },


});