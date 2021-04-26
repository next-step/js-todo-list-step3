export const $ = (selector, target = null) =>
  target ? target.querySelector(selector) : document.querySelector(selector);

export const $$ = (selector, target = null) =>
  target
    ? target.querySelectorAll(selector)
    : document.querySelectorAll(selector);
