import {createAd} from 'data.js';

const SIMILAR_OBJECT_COUNT = 10;
let userNumber = 1;

const similarAd = new Array(SIMILAR_OBJECT_COUNT).fill(null).map(() => createAd(userNumber++));
similarAd;
