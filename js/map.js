import {deactivateForm, activateAdForm, activateMapFilters} from './valid-form.js';
import {LAT_DEFAULT, LNG_DEFAULT, MAP_ZOOM, PRECISION_NUMBER} from './data.js';
import {createSimilarAdElement} from './popup.js';
import {filterData} from './map-filter.js';
import {debounce} from './utils/debounce.js';

const MAIN_PIN_ICON_SIZE = 52;
const MAIN_PIN_ICON_ANCHOR = 26;
const PIN_ICON_SIZE = 40;
const PIN_ICON_ANCHOR = 20;
const MAX_OFFERS = 10;
const RERENDER_DELAY = 500;
let isMapLoaded = false;
const TITLE_LAYER_LINK = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TITLE_LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>';
const mapFiltersForm = document.querySelector('.map__filters');

document.querySelector('#address').value = `${LAT_DEFAULT.toFixed(PRECISION_NUMBER)}, ${LNG_DEFAULT.toFixed(PRECISION_NUMBER)}`;

deactivateForm();

const map = L.map('map-canvas').on('load', () => {
  activateAdForm();
  isMapLoaded = true;
}).setView({
  lat: LAT_DEFAULT,
  lng: LNG_DEFAULT,
}, MAP_ZOOM);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [MAIN_PIN_ICON_SIZE, MAIN_PIN_ICON_SIZE],
  iconAnchor: [MAIN_PIN_ICON_ANCHOR, MAIN_PIN_ICON_SIZE],
});

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [PIN_ICON_SIZE, PIN_ICON_SIZE],
  iconAnchor: [PIN_ICON_ANCHOR, PIN_ICON_SIZE],
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
if (isMapLoaded) {
  mainPinMarker.addTo(map);
}

L.tileLayer(
  TITLE_LAYER_LINK,
  {
    attribution: TITLE_LAYER_ATTRIBUTION,
  },
).addTo(map);

mainPinMarker.on('move', () => {
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
      draggable: false,
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
  adverts = data.slice();
  if (isMapLoaded) {
    createMapPin(adverts.slice(0, MAX_OFFERS));
  }
  activateMapFilters();
  mapFiltersForm.addEventListener('change', debounce(onMapFilterChange), RERENDER_DELAY);
};

const resetMarkers = () => {
  removeMapPin();
  createMapPin(adverts.slice(0, MAX_OFFERS));
};

export {map, mainPinMarker, pinIcon, getDataOnSuccess, resetMarkers};
