import {createSimilarAdElement} from './popup.js';
import {map, pinIcon} from './map.js';
const mapCanvas = document.querySelector('.map__canvas');
const errorMessage = document.querySelector('#error-message').content.querySelector('.error-message');

const onSuccess = (data) => {
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

const onError = (err) => {
  const errorElement = errorMessage.cloneNode(true);
  errorElement.querySelector('.error-message__text').textContent = `Ошибка загрузки данных. ${err}`;
  mapCanvas.appendChild(errorElement);
};

export {onSuccess, onError};
