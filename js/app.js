// Swiper

const pageSwiper = new Swiper('.wrapper', {
  speed: 500,
  slidesPerView: 'auto',
  direction: "vertical",
  loop: false,
  // freeMode: true,
  spaceBetween: 160,
  mousewheel: true,
  observer: true,

  // For dev
  initialSlide: 2,
})


const aboutSwiper = new Swiper('.top-slider', {
  grabCursor: true,
  speed: 1000,
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

const partnersSwiper = new Swiper('.partners__swiper', {
  mousewheel: true,
  freeMode: true,
  spaceBetween: 20,
  slidesPerView: 'auto',
  // whatchOverflow: true,
  direction: "vertical",
  scrollbar: {
    el: ".partners__list-scroll",
    hide: false,
    draggable: true,
  },
  nested: true,
})

const partnersSlide = document.querySelector('.partners__swiper')
const mapElement = document.querySelector('#map')

partnersSlide.addEventListener('mouseenter', (e) => {
  pageSwiper.mousewheel.disable()
})

partnersSlide.addEventListener('mouseleave', (e) => {
  pageSwiper.mousewheel.enable()
})

mapElement.addEventListener('mouseenter', (e) => {
  pageSwiper.mousewheel.disable()
})

mapElement.addEventListener('mouseleave', (e) => {
  pageSwiper.mousewheel.enable()
})


// Google map

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  let map = new Map(document.getElementById("map"), {
    center: { lat: 49.58999845237651, lng: 34.55071308968833 },
    zoom: 12,
  });
}

initMap();