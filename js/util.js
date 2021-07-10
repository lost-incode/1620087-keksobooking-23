import {createSimilarAdElement} from './popup.js';
import {validateTimeIn, validatePrices, validateRooms} from './valid-form.js';
import {LAT_DEFAULT, LNG_DEFAULT, map, pinIcon} from './map.js';
const mapCanvas = document.querySelector('.map__canvas');
const errorMessage = document.querySelector('#error-message').content.querySelector('.error-message');
const successSubmitForm = document.querySelector('#success').content.querySelector('.success');
const errorSubmitForm = document.querySelector('#error').content.querySelector('.error');
// const resetButton = document.querySelector('.ad-form__reset');

const resetForm = (lat, lng) => {
  document.querySelector('.ad-form').reset();
  document.querySelector('#address').value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  validateTimeIn();
  validatePrices();
  validateRooms();
};

const getDataOnSuccess = (data) => {
  Array.from(data).forEach(({author, offer, location}) => {
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
  });
};

const getDataOnError = (err) => {
  const errorElement = errorMessage.cloneNode(true);
  errorElement.querySelector('.error-message__text').textContent = `Ошибка загрузки данных. ${err}`;
  mapCanvas.appendChild(errorElement);
};

const sendDataOnSuccess = () => {
  const successElement = successSubmitForm.cloneNode(true);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc' || evt.keyCode === 27) {
      successElement.remove();
      resetForm(LAT_DEFAULT, LNG_DEFAULT);
    }
  });
  successElement.addEventListener('click', () => {
    successElement.remove();
    resetForm(LAT_DEFAULT, LNG_DEFAULT);
  });
  document.body.append(successElement);
};

const sendDataOnError = () => {
  const errorElement = errorSubmitForm.cloneNode(true);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc' || evt.keyCode === 27) {
      errorElement.remove();
    }
  });
  errorElement.querySelector('.error__button').addEventListener('click', () => {
    errorElement.remove();
  });
  document.body.append(errorElement);
};

export {resetForm, getDataOnSuccess, getDataOnError, sendDataOnSuccess, sendDataOnError};
