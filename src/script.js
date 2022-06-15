// Swiper

const menu = ['CALENDAR', 'STATISTICS', 'HOME', 'PRODUCTIVITY', 'REMINDERS']
const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    initialSlide: 2,



    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 1500,
        modifier: 1.2,
        slideShadows: true,
    },

    // Pagination a.k.a "the navigation-bar"
    pagination: {
        el: '.swiper-pagination',
        transparent: false,
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