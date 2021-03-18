'use strict';

export const KeyValidator = {
  isEnter: keyCode => keyCode === 'Enter',
  isNotEnter: keyCode => keyCode !== 'Enter',
  isEsc: keyCode => keyCode === 'Escape',
  isNotEsc: keyCode => keyCode !== 'Escape',
};

export const ElementValidator = {
  isEmpty: element => element.value.trim() === '',
  isToggleBtn: target => target.matches('.toggle'),
  isNotToggleBtn: target => !target.matches('.toggle'),
  isDeleteBtn: target => target.matches('.destroy'),
  isNotDeleteBtn: target => !target.matches('.destroy'),
  isLabel: target => target.matches('.label'),
  isNotLabel: target => !target.matches('.label'),
  isFilterBtn: target => target.matches('.filters__btn'),
  isNotFilterBtn: target => !target.matches('.filters__btn'),
  isClearBtn: target => target.matches('.clear-completed'),
  isNotClearBtn: target => !target.matches('.clear-completed'),
  isRipple: target => target.matches('.ripple'),
  isNotRipple: target => !target.matches('.ripple'),
  isAddUserBtn: target => target.matches('.user-create-button'),
  isDeleteUserBtn: target => target.matches('.user-delete-button'),
};
