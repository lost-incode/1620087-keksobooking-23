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
  const popupTitle = adElement.querySelector('.popup__title');
  const popupTextAddress = adElement.querySelector('.popup__text--address');
  const popupTextPrice = adElement.querySelector('.popup__text--price');
  const popupType = adElement.querySelector('.popup__type');
  const popupTextCapacity = adElement.querySelector('.popup__text--capacity');
  const popupTextTime = adElement.querySelector('.popup__text--time');
  const popupDescription = adElement.querySelector('.popup__description');
  const photosAd = adElement.querySelector('.popup__photos');
  const popupAvatar= adElement.querySelector('.popup__avatar');

  if (offer.title) {
    popupTitle.textContent = offer.title;
  } else {
    popupTitle.remove();
  }
  if (offer.adress) {
    popupTextAddress.textContent = offer.adress;
  } else {
    popupTextAddress.remove();
  }
  if (offer.price) {
    popupTextPrice.textContent = `${offer.price} ₽/ночь`;
  } else {
    popupTextPrice.remove();
  }
  if (offer.type) {
    popupType.textContent = offerTypeTranslation[offer.type];
  } else {
    popupType.remove();
  }
  if ((offer.rooms) && (offer.guests)) {
    popupTextCapacity.textContent = `${offer.rooms} ${setNumDeclination(offer.rooms, 'комната', 'комнаты', 'комнат')} для ${offer.guests} ${setNumDeclination(offer.guests, 'гость', 'гостей', 'гостей')}`;
  } else {
    popupTextCapacity.remove();
  }
  if ((offer.checkin) && (offer.checkout)) {
    popupTextTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    popupTextTime.remove();
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
    popupDescription.textContent = offer.description;
  } else {
    popupDescription.remove();
  }
  if (offer.photos) {
    offer.photos.forEach((photoSrc) => {
      const photoAd = photosAd.querySelector('.popup__photo').cloneNode(false);
      photoAd.src = photoSrc;
      photosAd.appendChild(photoAd);
    });
    photosAd.querySelector('.popup__photo').remove();
  } else {
    photosAd.remove();
  }
  if (author.avatar) {
    popupAvatar.src = author.avatar;
  } else {
    popupAvatar.remove();
  }
  return adElement;
};

export {createSimilarAdElement};
