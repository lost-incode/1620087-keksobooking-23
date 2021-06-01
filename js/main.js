const getRandomInt = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};

getRandomInt(1, 90);

const getRandomFloat = (min, max, symbolNumber) => {
  if (min < 0 || max < 0) {
    return -1;
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return (Math.random() * (max - min + 0.01 ** symbolNumber) + min).toFixed(symbolNumber);
};

getRandomFloat(1, 90, 10);
