const getRandomInt = (min, max) => {
  if ((min < 0) && (max > 0)) {
    min = 0;
  }
  if (min === max) {
    return min;
  } else if ((min < 0) && (max <= 0)) {
    return -1;
  }
  return Math.floor(Math.random() * (Math.abs(max - min) + 1) + Math.min(min, max)); // Taken from https://developer.mozilla.org
};

getRandomInt(1, 90);

const getRandomFloat = (min, max, symbolNumber) => {
  if ((min < 0) && (max > 0)) {
    min = 0;
  }
  if ((min < 0) && (max <= 0)) {
    return -1;
  } else if (min === max) {
    return min.toFixed(symbolNumber);
  }
  return (Math.random() * (Math.abs(max - min) + 0.01 ** symbolNumber) + Math.min(min, max)).toFixed(symbolNumber); // Taken from https://developer.mozilla.org
};

getRandomFloat(1, 90, 10);
