'use strict';

import TodoListService from '../service/todoListService.js';
import { todoAppView } from '../view/todoAppView.js';
import { keyValidator, elementValidator } from '../utils/validator.js';

export default class TodoListController {
  constructor() {
    this.todoListService = new TodoListService();
    todoAppView.$todoappListContainer.addEventListener(
      'click',
      this.onClickTodoList
    );
    todoAppView.$todoappListContainer.addEventListener(
      'dblclick',
      this.onDoubleClickTodoList
    );
    todoAppView.$todoappListContainer.addEventListener(
      'keyup',
      this.onKeyUpTodoList
    );
    todoAppView.$todoappListContainer.addEventListener(
      'change',
      this.onChangePriority
    );
  }

  onClickTodoList = ({ target }) => {
    if (
      elementValidator.isNotDeleteBtn(target) &&
      elementValidator.isNotToggleBtn(target)
    ) {
      return;
    }
    if (elementValidator.isDeleteBtn(target)) {
      this.todoListService.deleteItem(target);
      return;
    }
    if (elementValidator.isToggleBtn(target)) {
      this.todoListService.toggleItem(target);
      return;
    }
  };

  onDoubleClickTodoList = ({ target }) => {
    if (elementValidator.isNotLabel(target)) return;
    this.todoListService.activateEditMode();
  };

  onKeyUpTodoList = event => {
    // 포커스 혹은 에딧모드일때만 활성화되도록 수정 필요.
    if (
      keyValidator.isNotEnter(event.key) &&
      keyValidator.isNotEsc(event.key)
    ) {
      return;
    }
    if (keyValidator.isEnter(event.key)) {
      this.todoListService.updateItem(event.target);
      return;
    }
    if (keyValidator.isEsc(event.key)) {
      this.todoListService.deactivateEditMode(event.target);
      return;
    }
  };

  onChangePriority = ({ target }) => {
    if (!target.classList.contains('chip')) return;
    this.todoListService.changePriority(target);
  };
}
