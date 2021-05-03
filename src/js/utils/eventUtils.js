import { checkEmpty } from "./stringUtils.js";

export const checkClassName = (event, name) =>
  event.target.classList.contains(name);
export const checkLocalName = (event, name) => event.target.localName === name;
export const checkKey = (event, key) => event.key === key;
export const isEmptyValue = (event) => checkEmpty(getValue(event));

export const getValue = (event) => event.target.value;
export const setClass = (target, selector = []) =>
  target.classList.add(...selector);
export const removeClass = (target, selector = []) =>
  target.classList.remove(...selector);
