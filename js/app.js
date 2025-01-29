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

let map
let geocoder
let marker

const mapSearchError = document.querySelector('.map-area__address-search-error')

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  geocoder = new google.maps.Geocoder();
  
  map = new Map(document.getElementById("map"), {
    center: { lat: 49.58999845237651, lng: 34.55071308968833 },
    zoom: 12,
  });
  
  // Межі пошуку
  // const bounds = new google.maps.LatLngBounds(
  //   new google.maps.LatLng(49.5000, 34.4500), // Південно-західна межа
  //   new google.maps.LatLng(49.6500, 34.6500)  // Північно-східна межа
  // );
  // new google.maps.Rectangle({
  //   bounds: bounds,
  //   strokeColor: "#FF0000",
  //   strokeOpacity: 0.8,
  //   strokeWeight: 2,
  //   fillColor: "#FF0000",
  //   fillOpacity: 0.1,
  //   map: map,
  // });
}

// Геокодування адреси
function geocodeAddress() {
  // Отримуємо адресу з поля вводу
  const address = document.getElementById("address").value
  mapSearchError.textContent = ''
  mapSearchError.classList.remove('error-show')
  

  // Перевіряємо, чи введено адресу
  if (!address) {
    mapSearchError.textContent = `Введіть адресу`
    mapSearchError.classList.add('error-show')
    return
  }

  // Виконуємо геокодування
  geocoder.geocode({
    address: address,
    bounds: {
      north: 49.6500, // Північна межа
      south: 49.5000, // Південна межа
      east: 34.6500,  // Східна межа
      west: 34.4500,  // Західна межа
    }
    }, (results, status) => {
    if (status === 'OK') {
      // Отримуємо координати адреси
      const location = results[0].geometry.location
      let timer = 0
      
      // Встановлюємо маркер на карті
      if (marker) {
        // Якщо маркер уже є встановлюємо менший маштаб
        map.setZoom(13)
        marker.setPosition(location)
        timer = 1000
      } else {
        marker = new google.maps.Marker ({
          map: map,
          position: location
        })
      }
      
      // Переміщуємо карту на нову адресу та збільшуємо масштаб
      setTimeout(()=>{
        map.panTo(location)
        map.setZoom(16)
      }, timer)
      
      
      // Інформаційне вікно з адресою
      const infoWindow = new google.maps.InfoWindow({
        content: `<p>${results[0].formatted_address}</p>`,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

    } else {
      mapSearchError.textContent = `Не вдалося знайти адресу ${status}`
      mapSearchError.classList.add('error-show')
    }
  })
}


initMap();