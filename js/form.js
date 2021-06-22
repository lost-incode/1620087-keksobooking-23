const adForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');

const deactivateForm = () => {
  adForm.classList.add('ad-form--disabled');
  const fieldsetsAdForm = adForm.querySelectorAll('fieldset');
  fieldsetsAdForm.forEach((fieldset) => fieldset.disabled = true);
  mapFiltersForm.classList.add('map__filters--disabled');
  const fieldsetsMapFiltersForm = mapFiltersForm.querySelectorAll('fieldset');
  const selectsMapFiltersForm = mapFiltersForm.querySelectorAll('select');
  fieldsetsMapFiltersForm.forEach((fieldset) => fieldset.disabled = true);
  selectsMapFiltersForm.forEach((select) => select.disabled = true);
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  const fieldsetsAdForm = adForm.querySelectorAll('fieldset');
  fieldsetsAdForm.forEach((fieldset) => fieldset.disabled = false);
  mapFiltersForm.classList.remove('map__filters--disabled');
  const fieldsetsMapFiltersForm = mapFiltersForm.querySelectorAll('fieldset');
  const selectsMapFiltersForm = mapFiltersForm.querySelectorAll('select');
  fieldsetsMapFiltersForm.forEach((fieldset) => fieldset.disabled = false);
  selectsMapFiltersForm.forEach((select) => select.disabled = false);
};

export {deactivateForm, activateForm};
