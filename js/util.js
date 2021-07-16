import {resetForm} from './user-form.js';
import {LAT_DEFAULT, LNG_DEFAULT, ESC_KEYCODE_TEXT, ESC_KEYCODE_SHORT_TEXT} from './data.js';
const NOMINATIVE_INDEX = 2;
const GENITIVE_SINGULAR_INDEX = 0;
const GENITIVE_PLURAL_INDEX = 1;
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

const sendDataOnSuccess = () => {
  const successElement = successSubmitForm.cloneNode(true);
  document.addEventListener('keydown', (evt) => onEscapeKeydown(evt, successElement));
  successElement.addEventListener('click', () => {
    successElement.remove();
    resetForm(LAT_DEFAULT, LNG_DEFAULT);
  });
  document.body.append(successElement);
  document.removeEventListener('keydown', (evt) => onEscapeKeydown(evt, successElement));
};

const sendDataOnError = () => {
  const errorElement = errorSubmitForm.cloneNode(true);
  document.addEventListener('keydown', (evt) => onEscapeKeydown(evt, errorElement));
  errorElement.querySelector('.error__button').addEventListener('click', () => {
    errorElement.remove();
  });
  document.body.append(errorElement);
  document.removeEventListener('keydown', (evt) => onEscapeKeydown(evt, errorElement));
};

const setNumDeclination = (num, ...args) => {
  if (args.length === 3) {
    if ((num % 100 >= 11) && (num % 100 <= 20) || (num % 10 >= 5) || (num % 10 === 0)) {
      return args[GENITIVE_PLURAL_INDEX];
    } else if (num % 10 === 1) {
      return args[NOMINATIVE_INDEX];
    } else {
      return args[GENITIVE_SINGULAR_INDEX];
    }
  }
  if (num === 1) {
    return args[GENITIVE_SINGULAR_INDEX];
  } else {
    return args[GENITIVE_PLURAL_INDEX];
  }
};

export {getDataOnError, sendDataOnSuccess, sendDataOnError, setNumDeclination};
