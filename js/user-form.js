import {sendData} from './api.js';
const adForm = document.querySelector('.ad-form');

const setUserFormSubmit = (onSuccess, onError) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onError(),
      new FormData(evt.target),
    );
  });
};

export {setUserFormSubmit};
