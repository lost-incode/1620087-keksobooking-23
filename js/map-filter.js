const MAX_OFFERS = 10;
const DEFAULT_VALUE = 'any';

const priceMap = {
  'low': {
    start: 0,
    end: 10000,
  },
  'middle': {
    start: 10000,
    end: 50000,
  },
  'high': {
    start: 50000,
    end: Infinity,
  },
};

const filters = Array.from(document.querySelector('.map__filters').children);

const filterRules = {
  'housing-type': (data, filter) => {
    const isCorrectValue = data.offer.type === filter.value;
    return isCorrectValue;
  },
  'housing-price': (data, filter) => {
    const isCorrectValue = data.offer.price >= priceMap[filter.value].start && data.offer.price < priceMap[filter.value].end;
    return isCorrectValue;
  },
  'housing-rooms': (data, filter) => {
    const isCorrectValue = data.offer.rooms.toString() === filter.value;
    return isCorrectValue;
  },
  'housing-guests': (data, filter) => {
    const isCorrectValue = data.offer.guests.toString() === filter.value;
    return isCorrectValue;
  },
  'housing-features': (data, filter) => {
    const checkListElements = Array.from(filter.querySelectorAll('input[type="checkbox"]:checked'));

    return checkListElements.every((checkbox) => {
      if(data.offer.features) {
        return data.offer.features.includes(checkbox.value);
      }
      return false;
    });
  },
};

const filterData = (data) => {
  let filteredOffers = [];
  let i = 0;
  let isCorrectValue;

  while (i < data.length && filteredOffers.length < MAX_OFFERS) {
    isCorrectValue = filters.every((filter) => {
      if (filter.value === DEFAULT_VALUE) {
        return true;
      } else {
        return filterRules[filter.id](data[i], filter);
      }
    });

    if (isCorrectValue) {
      filteredOffers.push(data[i]);
    }

    i++;
  }

  filteredOffers = filteredOffers.slice();
  return filteredOffers;
};

export {filterData};
