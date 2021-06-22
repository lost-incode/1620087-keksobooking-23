const adForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');
const fieldsetsAdForm = adForm.querySelectorAll('fieldset');
const elementsMapFiltersForm = mapFiltersForm.querySelectorAll('fieldset, select');

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
