'use strict';

import TodoInputView from '../view/todoInputView.js';
import todoApi from '../api/todoApi.js';
import { teamStore } from '../store/teamStore.js';
import { memberStore } from '../store/memberStore.js';
import { keyValidator, elementValidator } from '../utils/validator.js';

export default class TodoInputController {
  constructor() {
    this.todoInputView = new TodoInputView();
    console.log(this.todoInputView.$todoappListContainer);
    this.todoInputView.$todoappListContainer.addEventListener(
      'keyup',
      this.onKeyUpTodoInput
    );
  }

  onKeyUpTodoInput = event => {
    if (
      keyValidator.isNotEnter(event.key) ||
      elementValidator.isEmpty(event.target)
    ) {
      return;
    }
    this.addNewItem(event.target);
  };

  getCurrentMeber(target) {
    const currentMemberId = target.closest('.todoapp-container').dataset.id;
    return memberStore.findMember(currentMemberId);
  }

  async addNewItem(target) {
    const TemaId = teamStore.getCurrentTeam()._id;
    const memberId = this.getCurrentMeber(target)._id;
    const contents = target.value.trim();
    await todoApi.addTodoItem(TemaId, memberId, contents);
    this.todoInputView.clear(memberId);
  }
}
