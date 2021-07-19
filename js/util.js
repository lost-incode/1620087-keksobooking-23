import {resetForm} from './user-form.js';
import {LAT_DEFAULT, LNG_DEFAULT, ESC_KEYCODE_TEXT, ESC_KEYCODE_SHORT_TEXT} from './data.js';
const successSubmitForm = document.querySelector('#success').content.querySelector('.success');
const errorSubmitForm = document.querySelector('#error').content.querySelector('.error');

const removeOverlay = () => {
  const popup = document.querySelector('.popup_overlay');

  if (popup) {
    popup.remove();
  }
};

const onEscapeKeydown = (evt) => {
  if (evt.key === ESC_KEYCODE_TEXT || evt.key === ESC_KEYCODE_SHORT_TEXT) {
    removeOverlay();
    resetForm(LAT_DEFAULT, LNG_DEFAULT);
    document.removeEventListener('keydown', onEscapeKeydown);
  }
};

const onClickSuccessMessage = () => {
  removeOverlay();
  resetForm(LAT_DEFAULT, LNG_DEFAULT);
  document.removeEventListener('keydown', onEscapeKeydown);
};

const onClickErrorMessage = () => {
  removeOverlay();
  document.removeEventListener('keydown', onEscapeKeydown);
};

const sendDataOnSuccess = () => {
  const successElement = successSubmitForm.cloneNode(true);
  successElement.classList.add('popup_overlay');

  document.addEventListener('keydown', onEscapeKeydown);
  successElement.addEventListener('click', onClickSuccessMessage);

  document.body.append(successElement);
};

const sendDataOnError = () => {
  const errorElement = errorSubmitForm.cloneNode(true);
  errorElement.classList.add('popup_overlay');

  document.addEventListener('keydown', onEscapeKeydown);
  const errorButton = errorElement.querySelector('.error__button');
  errorButton.addEventListener('click', onClickErrorMessage);
  document.body.append(errorElement);
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

export {sendDataOnSuccess, sendDataOnError, setNumDeclination};
