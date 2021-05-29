const getRandomInt = (min, max) => {
  min = Math.abs(Math.floor(min));
  max = Math.abs(Math.floor(max));
  if (min === max) {
    return min;
  }
  return Math.floor(Math.random() * Math.abs(max - min + 1) + min); // Taken from https://developer.mozilla.org
};

getRandomInt(1, 90);

const getRandomFloat = (min, max, symbolNumber) => {
  min = Math.abs(min);
  max = Math.abs(max);
  if (min === max) {
    return min.toFixed(symbolNumber);
  }
  return (Math.random() * Math.abs(max - min + 1) + min).toFixed(symbolNumber); // Taken from https://developer.mozilla.org
};

getRandomFloat(1, 90, 10);
