import {sendDataOnSuccess, sendDataOnError} from './util.js';
// import {request} from './api.js';
import {setUserFormSubmit} from './user-form.js';
// import {getDataOnSuccess} from './map.js';

setUserFormSubmit(sendDataOnSuccess, sendDataOnError);
