import {deactivateForm, activateForm} from './valid-form.js';
import {LAT_DEFAULT, LNG_DEFAULT} from './data.js';
import {createSimilarAdElement} from './popup.js';

const MAX_OFFERS = 10;
const RERENDER_DELAY = 500;

const mapFiltersForm = document.querySelector('.map__filters');
const housingType = mapFiltersForm.querySelector('#housing-type');
const housingPrice = mapFiltersForm.querySelector('#housing-price');
const housingRooms = mapFiltersForm.querySelector('#housing-rooms');
const housingGuests = mapFiltersForm.querySelector('#housing-guests');
const housingFeatures = [
  mapFiltersForm.querySelector('#filter-wifi'),
  mapFiltersForm.querySelector('#filter-dishwasher'),
  mapFiltersForm.querySelector('#filter-parking'),
  mapFiltersForm.querySelector('#filter-washer'),
  mapFiltersForm.querySelector('#filter-elevator'),
  mapFiltersForm.querySelector('#filter-conditioner'),
];
document.querySelector('#address').value = `${LAT_DEFAULT.toFixed(5)}, ${LNG_DEFAULT.toFixed(5)}`;

deactivateForm();

const map = L.map('map-canvas').on('load', () => {
  activateForm('ad-form');
}).setView({
  lat: LAT_DEFAULT,
  lng: LNG_DEFAULT,
}, 12);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  {
    lat: LAT_DEFAULT,
    lng: LNG_DEFAULT,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

mainPinMarker.on('moveend', () => {
  document.querySelector('#address').value = `${mainPinMarker.getLatLng().lat.toFixed(5)}, ${mainPinMarker.getLatLng().lng.toFixed(5)}`;
});

let markers = [];

const createMapPin = ({author, offer, location}) => {
  const lat = location.lat;
  const lng = location.lng;
  const marker = L.marker({
    lat,
    lng,
  },
  {
    draggable: true,
    icon: pinIcon,
  });
  marker.addTo(map).bindPopup(createSimilarAdElement(author, offer));
  markers.push(marker);
};

let adverts = [];

const removeMapPin = () => {
  markers.forEach((marker) => map.removeLayer(marker));
  markers = [];
};

const filterPrice = (filterValue, element) => {
  if (filterValue === 'middle') {
    return element.offer.price >= 10000 &&  element.offer.price <= 50000;
  } else if (filterValue === 'low') {
    return element.offer.price <= 10000;
  } else {
    return element.offer.price >= 50000;
  }
};

const getAdvertRank = (advert) => {
  let rank = 0;
  housingFeatures.forEach((housingFeature) => {
    if (advert.offer.features && housingFeature.checked && advert.offer.features.includes(housingFeature.value)) {
      rank += 1;
    }
  });
  return rank;
};

const compareAdverts = (advertA, advertB) => {
  const rankA = getAdvertRank(advertA);
  const rankB = getAdvertRank(advertB);

  return rankB - rankA;
};

const filterData = (elements) => {
  let newAdverts = [];
  let isCorrectElement = true;
  for (let i = 0; i < elements.length; i++) {
    if (housingType.value !== 'any' && elements[i].offer.type !== housingType.value) {
      isCorrectElement = !isCorrectElement;
    }
    if (isCorrectElement && housingPrice.value !== 'any') {
      isCorrectElement = filterPrice(housingPrice.value, elements[i]);
    }
    if (isCorrectElement && housingRooms.value !== 'any' && elements[i].offer.rooms !== Number(housingRooms.value)) {
      isCorrectElement = !isCorrectElement;
    }
    if (isCorrectElement && housingGuests.value !== 'any' && elements[i].offer.guests !== Number(housingGuests.value)) {
      isCorrectElement = !isCorrectElement;
    }
    if (isCorrectElement) {
      newAdverts.push(elements[i]);
    }
    isCorrectElement = true;
  }
  newAdverts = newAdverts.sort(compareAdverts);
  newAdverts.slice(0, MAX_OFFERS).forEach((advert) => createMapPin(advert));
};

const onMapFilterChange = () => {
  setTimeout(removeMapPin(), RERENDER_DELAY);
  setTimeout(filterData(adverts), RERENDER_DELAY);
};

const getDataOnSuccess = (data) => {
  adverts = Array.from(data);
  adverts.slice(0, MAX_OFFERS).forEach((advert) => createMapPin(advert));
  activateForm('map__filters');
  mapFiltersForm.addEventListener('change', onMapFilterChange);
};

const resetMarkers = () => {
  adverts.slice(0, MAX_OFFERS).forEach((advert) => createMapPin(advert));
};

export {map, mainPinMarker, pinIcon, getDataOnSuccess, resetMarkers};
