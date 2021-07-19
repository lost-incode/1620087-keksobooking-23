import {resetForm} from './user-form.js';
import {LAT_DEFAULT, LNG_DEFAULT, ESC_KEYCODE_TEXT, ESC_KEYCODE_SHORT_TEXT} from './data.js';
const mapCanvas = document.querySelector('.map__canvas');
const errorMessage = document.querySelector('#error-message').content.querySelector('.error-message');
const successSubmitForm = document.querySelector('#success').content.querySelector('.success');
const errorSubmitForm = document.querySelector('#error').content.querySelector('.error');

const getDataOnError = () => {
  const errorElement = errorMessage.cloneNode(true);
  errorElement.querySelector('.error-message__text').textContent = 'Ошибка загрузки данных с сервера.';
  mapCanvas.appendChild(errorElement);
};

const onEscapeKeydown = (event, element) => {
  if (event.key === ESC_KEYCODE_TEXT || event.key === ESC_KEYCODE_SHORT_TEXT) {
    element.remove();
    resetForm(LAT_DEFAULT, LNG_DEFAULT);
  }
};

const onClickSuccessMessage = (element) => {
  element.remove();
  resetForm(LAT_DEFAULT, LNG_DEFAULT);
};

const onClickErrorMessage = (element) => {
  element.remove();
};

const sendDataOnSuccess = () => {
  const successElement = successSubmitForm.cloneNode(true);
  document.addEventListener('keydown', (evt) => onEscapeKeydown(evt, successElement));
  successElement.addEventListener('click', () => onClickSuccessMessage(successElement));
  document.body.append(successElement);
  document.removeEventListener('keydown', (evt) => onEscapeKeydown(evt, successElement));
};

const sendDataOnError = () => {
  const errorElement = errorSubmitForm.cloneNode(true);
  document.addEventListener('keydown', (evt) => onEscapeKeydown(evt, errorElement));
  const errorButton = errorElement.querySelector('.error__button');
  errorButton.addEventListener('click', () => onClickErrorMessage(errorElement));
  document.body.append(errorElement);
  document.removeEventListener('keydown', (evt) => onEscapeKeydown(evt, errorElement));
};

const setNumDeclination = (num, nominative, genitiveSingular, genitivePlural) => {
  if(num > 10 && (Math.round((num % 100) / 10)) === 1){
    return genitivePlural;
  } else {
    switch(num % 10){
      case 1: return nominative;
      case 2:
      case 3:
      case 4: return genitiveSingular;
    }
    return genitivePlural;
  }
};

export {getDataOnError, sendDataOnSuccess, sendDataOnError, setNumDeclination};
