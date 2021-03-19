'use strict';

import { $ } from '../utils/dom.js';

export default class TodoInputView {
  constructor() {
    this.$todoappListContainer = $('.todoapp-list-container');
  }

  clear(memberId) {
    const $todoApp = $(`li[data-id=${memberId}]`);
    const $todoInput = $('.new-todo', $todoApp);
    $todoInput.value = '';
  }
}
