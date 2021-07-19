import {sendDataOnSuccess, sendDataOnError} from './util.js';
import {setUserFormSubmit} from './user-form.js';

setUserFormSubmit(sendDataOnSuccess, sendDataOnError);
