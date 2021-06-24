const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;

const adForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');
const fieldsetsAdForm = adForm.querySelectorAll('fieldset');
const elementsMapFiltersForm = mapFiltersForm.querySelectorAll('fieldset, select');
const titleInput = adForm.querySelector('#title');
const priceInput = adForm.querySelector('#price');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const guestNumber = capacity.querySelectorAll('option');

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

priceInput.addEventListener('input', () => {
  const priceValue = priceInput.value;

  if (priceValue > MAX_PRICE_VALUE) {
    priceInput.setCustomValidity(`Цена за ночь не может превышать ${MAX_PRICE_VALUE} руб.`);
  } else {
    titleInput.setCustomValidity('');
  }

  priceInput.reportValidity();
});

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

export {deactivateForm, activateForm};
