const pageSwiper = new Swiper('.wrapper', {
  speed: 800,
  slidesPerView: 'auto',
  direction: "vertical",
  loop: false,
  // freeMode: true,
  // spaceBetween: 50,
  mousewheel: true,
  observer: true,

  // For dev
  initialSlide: 1,
})


// Добавить справа зверху навігацію для aboutSwiper
const aboutSwiper = new Swiper('.top-slider', {
  grabCursor: true,
  speed: 800,
  slidesPerView: 'auto',
  loop: false,
  spaceBetween: 250,
  mousewheel: true,
  nested: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
})

const partnersSwiper = new Swiper('.partners__container', {
  speed: 800,
  mousewheel: true,
  freeMode: true,
  slidesPerView: 3,
  // whatchOverflow: true,
  direction: "vertical",
  scrollbar: {
    el: ".partners__list-scroll",
    hide: false,
    draggable: true,
  },
  nested: true,
})

const partnersSlide = document.querySelector('.partners__container')

partnersSlide.addEventListener('mouseenter', (e) => {
  console.log('mouseenter')
  pageSwiper.mousewheel.disable()
})

partnersSlide.addEventListener('mouseleave', (e) => {
  console.log('mouseleave')
  pageSwiper.mousewheel.enable()
})

