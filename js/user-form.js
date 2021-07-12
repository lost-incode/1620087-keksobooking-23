import {validateTimeIn,  validatePrices,  validateRooms} from './valid-form.js';
import {mainPinMarker, map} from './map.js';
import {LAT_DEFAULT, LNG_DEFAULT} from './data.js';
import {request} from './api.js';
const adForm = document.querySelector('.ad-form');

const setUserFormSubmit = (onSuccess, onError) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    request(
      () => onSuccess(),
      () => onError(),
      adForm.method.toUpperCase(),
      new FormData(evt.target),
    );
  });
};

const resetForm = (lat, lng) => {
  document.querySelector('.map__filters').reset();
  document.querySelector('.ad-form').reset();
  document.querySelector('#address').value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  mainPinMarker.setLatLng({lat: LAT_DEFAULT, lng: LNG_DEFAULT});
  map.setView({lat: LAT_DEFAULT, lng: LNG_DEFAULT}, 12);
  validateTimeIn();
  validatePrices();
  validateRooms();
};

export {setUserFormSubmit, resetForm};
