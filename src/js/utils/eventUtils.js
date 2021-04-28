import { checkEmpty } from "./stringUtils.js";

export const checkClassName = (event, name) => event.target.className === name;
export const checkLocalName = (event, name) => event.target.localName === name;
export const checkKey = (event, key) => event.key === key;
export const isEmptyValue = (event) => checkEmpty(getValue(event));

export const getClassName = (event) => event.target.className;
export const getValue = (event) => event.target.value;
export const getClassLiId = (event) =>
  event.target.closest("li").getAttribute("data-id");
export const getButtonId = (event) =>
  event.target.closest("button").getAttribute("data-id");
export const getCloset = (event, selector) => event.target.closest(selector);
export const getClosestAttribute = (event, selector, attribute = "id") =>
  event.target.closest(selector).getAttribute(attribute);
export const setClass = (target, selector = []) =>
  target.classList.add(...selector);
export const removeClass = (target, selector = []) =>
  target.classList.remove(...selector);

export const isUserTarget = (event) =>
  event.target.closest("user-list-item") !== null &&
  event.target.getAttribute("data-action") === "selectUser";
