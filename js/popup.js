const mapCanvas = document.querySelector('.map__canvas');
const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');

const insertToPageSimilarAd = (author, offer) => {
  const adElement = similarAdTemplate.cloneNode(true);
  (offer.title) ? adElement.querySelector('.popup__title').textContent = offer.title : adElement.querySelector('.popup__title').remove();
  (offer.adress) ? adElement.querySelector('.popup__text--address').textContent = offer.adress : adElement.querySelector('.popup__text--address').remove();
  (offer.price) ? adElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь` : adElement.querySelector('.popup__text--price').remove();
  if (offer.type) {
    let offerType;
    switch(offer.type){
      case 'flat':
        offerType = 'Квартира';
        break;
      case 'bungalow':
        offerType = 'Бунгало';
        break;
      case 'house':
        offerType = 'Дом';
        break;
      case 'palace':
        offerType = 'Дворец';
        break;
      case 'hotel':
        offerType = 'Отель';
        break;
    }
    adElement.querySelector('.popup__type').textContent = offerType;
  } else {
    adElement.querySelector('.popup__type').remove();
  }
  ((offer.rooms) && (offer.guests)) ? adElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей` : adElement.querySelector('.popup__text--capacity').remove();
  ((offer.checkin) && (offer.checkout)) ? adElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}` : adElement.querySelector('.popup__text--time').remove();
  if (offer.features.length > 0) {
    const featuresOffer = adElement.querySelector('.popup__features');
    const modifiers = offer.features.map((feature) => `popup__feature--${feature}`);
    featuresOffer.querySelectorAll('.popup__feature').forEach((item) => {
      const modifier = item.classList[1];
      if (!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  } else {
    adElement.querySelector('.popup__features').remove();
  }
  (offer.description) ? adElement.querySelector('.popup__description').textContent = offer.description : adElement.querySelector('.popup__description').remove();
  if (offer.photos.length > 0) {
    const photosAd = adElement.querySelector('.popup__photos');
    offer.photos.forEach((photoSrc) => {
      const photoAd = photosAd.querySelector('.popup__photo').cloneNode(false);
      photoAd.src = photoSrc;
      photosAd.appendChild(photoAd);
    });
    photosAd.querySelector('.popup__photo').remove(); //Удаляет вывод первого img, в котором нет src
  } else {
    adElement.querySelector('.popup__photos').remove();
  }
  (author.avatar) ? adElement.querySelector('.popup__avatar').src = author.avatar : adElement.querySelector('.popup__avatar').remove();
  mapCanvas.appendChild(adElement);
};

export {insertToPageSimilarAd};
