import config from '../config/index.js';

const loadingTemplate = () => {
  const $loadingContainer = document.querySelector('.loading-bar-container');
  $loadingContainer.innerHTML = '<div class="circle"></div>';
};
loadingTemplate();

const enableLoadingBar = () => {
  const $loadingContainer = document.querySelector('.loading-bar-container');
  $loadingContainer.classList.add('show');
  $loadingContainer.classList.remove('not-show');
};

const disableLoadingBar = () => {
  const $loadingContainer = document.querySelector('.loading-bar-container');
  $loadingContainer.classList.add('not-show');
  $loadingContainer.classList.remove('show');
};

const constantMock = window.fetch;
window.fetch = function () {
  if (
    Array.from(arguments)
      .map((arg) => {
        return arg.method || arg.includes(config.baseUrl);
      })
      .includes(true)
  ) {
    enableLoadingBar();
  }
  return new Promise((resolve, reject) => {
    constantMock
      .apply(this, arguments)
      .then((response) => {
        disableLoadingBar();
        resolve(response);
      })
      .catch((error) => {
        disableLoadingBar();
        reject(response);
      });
  });
};

export default {};
