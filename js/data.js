import {getRandomInt, getRandomFloat} from 'util.js';

const OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const OFFER_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const createAuthor = (authorNumber) => {
  if (authorNumber < 10) {
    authorNumber = `0${authorNumber}`;
  }
  return {
    avatar: `img/avatars/user${authorNumber}.png`,
  };
};

const createOffer = () => {
  const randomOfferTypesIndex = getRandomInt(0, OFFER_TYPES.length - 1);
  const randomOfferCheckinIndex = getRandomInt(0, OFFER_TIMES.length - 1);
  const randomOfferCheckoutIndex = getRandomInt(0, OFFER_TIMES.length - 1);
  const randomOfferFeaturesLength = getRandomInt(0, OFFER_FEATURES.length - 1);
  const randomOfferPhotosLength = getRandomInt(1, OFFER_PHOTOS.length - 1);
  const randomlocationLat = getRandomFloat(35.65000, 35.70000, 5);
  const randomlocationLng = getRandomFloat(139.70000, 139.80000, 5);
  return {
    title: 'Прекраснейшее жилье',
    address: `${randomlocationLat}, ${randomlocationLng}`,
    price: getRandomInt(1, 1000000),
    type: OFFER_TYPES[randomOfferTypesIndex],
    rooms: getRandomInt(1, 20),
    guests: getRandomInt(1, 20),
    checkin: OFFER_TIMES[randomOfferCheckinIndex],
    checkout: OFFER_TIMES[randomOfferCheckoutIndex],
    features: OFFER_FEATURES.slice(0, randomOfferFeaturesLength),
    description: 'Завтрак включен в стоимость',
    photos: OFFER_PHOTOS.slice(0, randomOfferPhotosLength),
  };
};

const createLocation = () => {
  const randomlocationLat = getRandomFloat(35.65000, 35.70000, 5);
  const randomlocationLng = getRandomFloat(139.70000, 139.80000, 5);
  return {
    lat: randomlocationLat,
    lng: randomlocationLng,
  };
};

const createAd = (authorNumber) => ({
  author: createAuthor(authorNumber),
  offer: createOffer(),
  location: createLocation(),
});

export {createAd};
