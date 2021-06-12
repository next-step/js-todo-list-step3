export function $(element) {
  return document.querySelector(element);
}

export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && JSON.stringify(obj) === JSON.stringify({});
}
