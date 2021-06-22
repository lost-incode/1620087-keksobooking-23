const deactivateForm = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.add('ad-form--disabled');
  const fieldsetsAdForm = adForm.querySelectorAll('fieldset');
  const selectsAdForm = adForm.querySelectorAll('select');
  fieldsetsAdForm.forEach((fieldset) => fieldset.disabled = true);
  selectsAdForm.forEach((select) => select.disabled = true);
  const mapFiltersForm = document.querySelector('.map__filters');
  mapFiltersForm.classList.add('map__filters--disabled');
  const fieldsetsMapFiltersForm = mapFiltersForm.querySelectorAll('fieldset');
  const selectsMapFiltersForm = mapFiltersForm.querySelectorAll('select');
  fieldsetsMapFiltersForm.forEach((fieldset) => fieldset.disabled = true);
  selectsMapFiltersForm.forEach((select) => select.disabled = true);
};

const activateForm = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form--disabled');
  const fieldsetsAdForm = adForm.querySelectorAll('fieldset');
  const selectsAdForm = adForm.querySelectorAll('select');
  fieldsetsAdForm.forEach((fieldset) => fieldset.disabled = false);
  selectsAdForm.forEach((select) => select.disabled = false);
  const mapFiltersForm = document.querySelector('.map__filters');
  mapFiltersForm.classList.remove('map__filters--disabled');
  const fieldsetsMapFiltersForm = mapFiltersForm.querySelectorAll('fieldset');
  const selectsMapFiltersForm = mapFiltersForm.querySelectorAll('select');
  fieldsetsMapFiltersForm.forEach((fieldset) => fieldset.disabled = false);
  selectsMapFiltersForm.forEach((select) => select.disabled = false);
};

export {deactivateForm, activateForm};
