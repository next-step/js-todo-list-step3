import { SELECTORS } from "./constant.js";

export const $ = (selector, target = document) =>
  target.querySelector(selector);
export const $$ = (selector, target = document) =>
  target.querySelectorAll(selector);

export const getMemberId = (target) =>
  target.closest(SELECTORS.TODO).dataset.member;
export const getTodoItemId = (target) =>
  target.closest(SELECTORS.TODO_ITEM).dataset.item;
