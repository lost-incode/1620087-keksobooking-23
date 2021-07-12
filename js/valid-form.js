import {LAT_DEFAULT, LNG_DEFAULT} from './data.js';
import {resetForm} from './user-form.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const adForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');
const fieldsetsAdForm = adForm.querySelectorAll('fieldset');
const elementsMapFiltersForm = mapFiltersForm.querySelectorAll('fieldset, select');
const titleInput = adForm.querySelector('#title');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const priceInput = adForm.querySelector('#price');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const type = adForm.querySelector('#type');
const guestNumber = capacity.querySelectorAll('option');
const resetButton = document.querySelector('.ad-form__reset');

const MinPrices = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const NumberOfGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

const validateTimeIn = () => {
  timeOut.value = timeIn.value;
};

validateTimeIn();

const onTimeInChange = () => {
  validateTimeIn();
};

timeIn.addEventListener('change', onTimeInChange);

const validateTimeOut = () => {
  timeIn.value = timeOut.value;
};

validateTimeOut();

const onTimeOutChange = () => {
  validateTimeOut();
};

timeOut.addEventListener('change', onTimeOutChange);

const validatePrices = () => {
  const typeValue = type.value;
  priceInput.min = MinPrices[typeValue];
  priceInput.placeholder = MinPrices[typeValue];
};

validatePrices();

const onTypeChange = () => {
  validatePrices();
};

type.addEventListener('change', onTypeChange);

const validateRooms = () => {
  const roomValue = roomNumber.value;

  guestNumber.forEach((guest) => {
    //проверяем, есть ли в массиве, который является значением ключа объекта
    //(ключ - выбранное пользоватем количество комнат),
    //количество гостей - guest.value. если есть - false, иначе - true
    const isDisabled = (NumberOfGuests[roomValue].indexOf(guest.value) === -1);
    guest.selected = NumberOfGuests[roomValue][0] === guest.value;
    guest.disabled = isDisabled;
    guest.hidden = isDisabled;
  });
};

validateRooms();

const onRoomNumberChange = () => {
  validateRooms();
};

roomNumber.addEventListener('change', onRoomNumberChange);

const deactivateForm = () => {
  adForm.classList.add('ad-form--disabled');
  fieldsetsAdForm.forEach((fieldset) => fieldset.disabled = true);
  mapFiltersForm.classList.add('map__filters--disabled');
  elementsMapFiltersForm.forEach((element) => element.disabled = true);
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  fieldsetsAdForm.forEach((fieldset) => fieldset.disabled = false);
  mapFiltersForm.classList.remove('map__filters--disabled');
  elementsMapFiltersForm.forEach((element) => element.disabled = false);
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm(LAT_DEFAULT, LNG_DEFAULT);
});

export {deactivateForm, activateForm,   validateTimeIn,  validatePrices,  validateRooms};
