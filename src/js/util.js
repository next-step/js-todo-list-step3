export const getEl = (selector, parent = document) => parent.querySelector(selector);
export const pipe = (...fns) => (args) => fns.reduce((arg, nextFn) => nextFn(arg), args);
export const containsClass = (element, className) => element.classList.contains(className);

export const getUrlParam = (key) => {
  var params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, (str, key, value) => {
    params[key] = value;
  });
  return decodeURI(params[key]);
};
