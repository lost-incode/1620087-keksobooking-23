import {validateTimeIn,  validatePrices,  validateRooms} from './valid-form.js';
import {mainPinMarker, map} from './map.js';
import {LAT_DEFAULT, LNG_DEFAULT} from './data.js';
import {request} from './api.js';
const adForm = document.querySelector('.ad-form');
const adFormHeaderPreviewInput = adForm.querySelector('#avatar');
const adFormHeaderPreview = adForm.querySelector('.ad-form-header__preview');
const adFormPhoto = adForm.querySelector('.ad-form__photo');
const adFormPhotoInput = adForm.querySelector('#images');
const IMAGE_WIDTH = 70;
const IMAGE_HEIGHT = 70;

const onPreviewAvatar = () => {
  const image = adFormHeaderPreview.querySelector('img');
  const file = adFormHeaderPreviewInput.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    image.src= reader.result;
  }, false);

  reader.readAsDataURL(file);
};

adFormHeaderPreviewInput.addEventListener('change', () => onPreviewAvatar());

const onPreviewImage = () => {
  if (adFormPhoto.firstChild) {
    adFormPhoto.removeChild(adFormPhoto.firstChild);
  }
  const image = document.createElement('img');
  image.width = IMAGE_WIDTH;
  image.height = IMAGE_HEIGHT;
  const file = adFormPhotoInput.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    image.src= reader.result;
  }, false);

  reader.readAsDataURL(file);
  adFormPhoto.appendChild(image);
};

adFormPhotoInput.addEventListener('change', () => onPreviewImage());

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
