// import {createAd} from './data.js';

import {deactivateForm} from './form.js';
import {onSuccess, onError} from './user-form.js';

// const SIMILAR_OBJECT_COUNT = 10;

// let userNumber = 1;
// const similarAds = new Array(SIMILAR_OBJECT_COUNT).fill(null).map(() => createAd(userNumber++));

// console.log(similarAds.json());

deactivateForm();

fetch(
  'https://23.javascript.pages.academy/keksobooking/data',
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  }).then((data) => {
    onSuccess(data);
  }).catch((err) => {
    onError(err);
  });
