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
    this.todoListService.activateEditMode(target);
  };

  onKeyUpTodoList = ({ target, key }) => {
    if (keyValidator.isNotEnter(key) && keyValidator.isNotEsc(key)) {
      return;
    }
    if (keyValidator.isEnter(key) && target.matches('.edit')) {
      this.todoListService.editItem(target);
      return;
    }
    if (keyValidator.isEsc(key)) {
      this.todoListService.deactivateEditMode(target);
      return;
    }
  };

  onChangePriority = ({ target }) => {
    if (!target.classList.contains('chip')) return;
    this.todoListService.changePriority(target);
  };
}
