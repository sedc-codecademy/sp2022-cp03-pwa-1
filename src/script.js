const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    effect: 'coverflow',
    grabCursor: true,
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