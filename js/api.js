const Urls = {
  GET: 'https://23.javascript.pages.academy/keksobooking/data',
  POST: 'https://23.javascript.pages.academy/keksobooking',
};

const request = (onSuccess, onError, method, data) => {
  fetch(
    Urls[method],
    {
      method: method,
      body: data,
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    }).then((offers) => {
      onSuccess(offers);
    }).catch(() => {
      onError();
    });
};

export {request};
