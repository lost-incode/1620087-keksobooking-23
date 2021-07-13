import {getDataOnError, sendDataOnSuccess, sendDataOnError} from './util.js';
import {request} from './api.js';
import {setUserFormSubmit} from './user-form.js';
import {getDataOnSuccess} from './map.js';

request(getDataOnSuccess, getDataOnError, 'GET');
// setUserFormSubmit();
setUserFormSubmit(sendDataOnSuccess, sendDataOnError);
