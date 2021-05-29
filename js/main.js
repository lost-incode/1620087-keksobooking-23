const getRandomInt = (min, max) => {
  if (min === max) {
    return min;
  }
  return Math.floor(Math.random() * Math.abs(max - min + 1) + min); // Taken from https://developer.mozilla.org
};

getRandomInt(1, 90);

const getRandomFloat = (min, max, symbolNumber) => {
  if (min === max) {
    return min.toFixed(symbolNumber);
  }
  return (Math.random() * Math.abs(max - min + 1) + min).toFixed(symbolNumber); // Taken from https://developer.mozilla.org
};

getRandomFloat(1, 90, 10);
