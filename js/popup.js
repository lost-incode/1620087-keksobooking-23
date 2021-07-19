import {setNumDeclination} from './util.js';
const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');
const offerTypeTranslation = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

const createSimilarAdElement = (author, offer) => {
  const adElement = similarAdTemplate.cloneNode(true);
  if (offer.title) {
    adElement.querySelector('.popup__title').textContent = offer.title;
  } else {
    adElement.querySelector('.popup__title').remove();
  }
  if (offer.adress) {
    adElement.querySelector('.popup__text--address').textContent = offer.adress;
  } else {
    adElement.querySelector('.popup__text--address').remove();
  }
  if (offer.price) {
    adElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  } else {
    adElement.querySelector('.popup__text--price').remove();
  }
  if (offer.type) {
    adElement.querySelector('.popup__type').textContent = offerTypeTranslation[offer.type];
  } else {
    adElement.querySelector('.popup__type').remove();
  }
  if ((offer.rooms) && (offer.guests)) {
    adElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${setNumDeclination(offer.rooms, 'комната', 'комнаты', 'комнат')} для ${offer.guests} ${setNumDeclination(offer.guests, 'гость', 'гостей', 'гостей')}`;
  } else {
    adElement.querySelector('.popup__text--capacity').remove();
  }
  if ((offer.checkin) && (offer.checkout)) {
    adElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    adElement.querySelector('.popup__text--time').remove();
  }
  if (offer.features) {
    const featuresOffer = adElement.querySelectorAll('.popup__feature');
    featuresOffer.forEach((item) => {
      if (offer.features.indexOf(item.classList[1].replace('popup__feature--', '')) === -1) {
        item.remove();
      }
    });
  } else {
    adElement.querySelector('.popup__features').remove();
  }
  if (offer.description) {
    adElement.querySelector('.popup__description').textContent = offer.description;
  } else {
    adElement.querySelector('.popup__description').remove();
  }
  if (offer.photos) {
    const photosAd = adElement.querySelector('.popup__photos');
    offer.photos.forEach((photoSrc) => {
      const photoAd = photosAd.querySelector('.popup__photo').cloneNode(false);
      photoAd.src = photoSrc;
      photosAd.appendChild(photoAd);
    });
    photosAd.querySelector('.popup__photo').remove();
  } else {
    adElement.querySelector('.popup__photos').remove();
  }
  if (author.avatar) {
    adElement.querySelector('.popup__avatar').src = author.avatar;
  } else {
    adElement.querySelector('.popup__avatar').remove();
  }
  return adElement;
};

export {createSimilarAdElement};
