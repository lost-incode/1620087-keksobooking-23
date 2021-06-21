const deactivateForm = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.add('ad-form--disabled');
  const elementsAdForm = adForm.elements;
  for (const element of elementsAdForm) {
    element.setAttribute('disabled', '');
  }
  const mapFiltersForm = document.querySelector('.map__filters');
  mapFiltersForm.classList.add('ad-form--disabled');
  const elementsMapFiltersForm = mapFiltersForm.elements;
  for (const element of elementsMapFiltersForm) {
    element.setAttribute('disabled', '');
  }
};

const activateForm = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form--disabled');
  const elementsAdForm = adForm.elements;
  for (const element of elementsAdForm) {
    element.removeAttribute('disabled', '');
  }
  const mapFiltersForm = document.querySelector('.map__filters');
  mapFiltersForm.classList.add('ad-form--disabled');
  const elementsMapFiltersForm = mapFiltersForm.elements;
  for (const element of elementsMapFiltersForm) {
    element.removeAttribute('disabled', '');
  }
};

export {deactivateForm, activateForm};
