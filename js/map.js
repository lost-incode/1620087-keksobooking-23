import {deactivateForm, activateForm} from './valid-form.js';
import {LAT_DEFAULT, LNG_DEFAULT} from './data.js';
import {createSimilarAdElement} from './popup.js';
import {filterData} from './map-filter.js';
import {debounce} from './utils/debounce.js';

const MAX_OFFERS = 10;
const RERENDER_DELAY = 500;
const mapFiltersForm = document.querySelector('.map__filters');

document.querySelector('#address').value = `${LAT_DEFAULT.toFixed(5)}, ${LNG_DEFAULT.toFixed(5)}`;

deactivateForm();

const map = L.map('map-canvas').on('load', () => {
  activateForm('ad-form');
}).setView({
  lat: LAT_DEFAULT,
  lng: LNG_DEFAULT,
}, 12);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
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

const createMapPin = (elements) => {
  Array.from(elements).forEach(({author, offer, location}) => {
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
  });
};

let adverts = [];

const removeMapPin = () => {
  markers.forEach((marker) => map.removeLayer(marker));
  markers = [];
};

const onMapFilterChange = () => {
  removeMapPin();
  createMapPin(filterData(adverts));
};

const getDataOnSuccess = (data) => {
  adverts = Array.from(data);
  createMapPin(adverts.slice(0, MAX_OFFERS));
  activateForm('map__filters');
  mapFiltersForm.addEventListener('change', debounce(onMapFilterChange), RERENDER_DELAY);
};

const resetMarkers = () => {
  createMapPin(adverts.slice(0, MAX_OFFERS));
};

export {map, mainPinMarker, pinIcon, getDataOnSuccess, resetMarkers};
