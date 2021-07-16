const TIMEOUT_DELAY_DEFAULT = 500;

const debounce = function (callback, timeoutDelay = TIMEOUT_DELAY_DEFAULT) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {debounce};
