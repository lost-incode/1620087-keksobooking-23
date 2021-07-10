// import {createAd} from './data.js';

// import {deactivateForm} from './valid-form.js';
import {getDataOnSuccess, getDataOnError, sendDataOnSuccess, sendDataOnError} from './util.js';
import {getData} from './api.js';
import {setUserFormSubmit} from './user-form.js';

getData(getDataOnSuccess, getDataOnError);
setUserFormSubmit();
setUserFormSubmit(sendDataOnSuccess, sendDataOnError);


// const SIMILAR_OBJECT_COUNT = 10;

// let userNumber = 1;
// const similarAds = new Array(SIMILAR_OBJECT_COUNT).fill(null).map(() => createAd(userNumber++));


