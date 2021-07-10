import {createSimilarAdElement} from './popup.js';
import {resetForm} from './user-form.js';
import {map, pinIcon} from './map.js';
import {LAT_DEFAULT, LNG_DEFAULT} from './data.js';
const mapCanvas = document.querySelector('.map__canvas');
const errorMessage = document.querySelector('#error-message').content.querySelector('.error-message');
const successSubmitForm = document.querySelector('#success').content.querySelector('.success');
const errorSubmitForm = document.querySelector('#error').content.querySelector('.error');

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
    if (evt.key === 'Escape' || evt.key === 'Esc') {
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
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      errorElement.remove();
    }
  });
  errorElement.querySelector('.error__button').addEventListener('click', () => {
    errorElement.remove();
  });
  document.body.append(errorElement);
};

export {getDataOnSuccess, getDataOnError, sendDataOnSuccess, sendDataOnError};
