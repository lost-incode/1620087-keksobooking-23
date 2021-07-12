import {deactivateForm, activateForm} from './valid-form.js';
import {LAT_DEFAULT, LNG_DEFAULT} from './data.js';
import {createSimilarAdElement} from './popup.js';
document.querySelector('#address').value = `${LAT_DEFAULT.toFixed(5)}, ${LNG_DEFAULT.toFixed(5)}`;

deactivateForm();

const MAX_OFFERS = 10;

const map = L.map('map-canvas').on('load', () => {
  activateForm();
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
};

let adverts = [];

const getDataOnSuccess = (data) => {
  adverts = Array.from(data);
  adverts.slice(0, MAX_OFFERS).forEach((advert) => createMapPin(advert));
};

export {map, mainPinMarker, pinIcon, getDataOnSuccess};
