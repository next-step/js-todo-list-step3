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

export const getPriorityValue = (priority) => {
  const valueObj = {
    0: "NONE",
    1: "FIRST",
    2: "SECOND",
  };
  return valueObj[priority];
};
