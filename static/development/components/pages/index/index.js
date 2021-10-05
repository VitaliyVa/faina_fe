import './index.scss';

let swiper = new Swiper(".main_slider", {
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        type: "fraction",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

let swiperInsta = new Swiper(".insta__block", {
    loop: true,
    slidesPerView: 6,
    spaceBetween: 0,
    speed: 1000,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        1450: {
            slidesPerView: 6,
        },
        992: {
            slidesPerView: 5,
        },
        700: {
            slidesPerView: 4,
        },
        300: {
            slidesPerView: 2,
        },
    },
});