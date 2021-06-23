import {createAd} from './data.js';
import {insertToPageSimilarAd} from './popup.js';
import {deactivateForm, activateForm} from './form.js';

document.body.style.fill = 'red';

const SIMILAR_OBJECT_COUNT = 10;
let userNumber = 1;

const similarAds = new Array(SIMILAR_OBJECT_COUNT).fill(null).map(() => createAd(userNumber++));
similarAds.forEach(({author, offer}) => insertToPageSimilarAd(author, offer));
deactivateForm();
activateForm();
