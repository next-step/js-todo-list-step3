'use strict';

import { $ } from '../utils/dom.js';
import { kanbanTitleTemplate } from '../layout/teamTemplates.js';
import {
  todoAppTemplate,
  todoItemTemplate,
  userAddButtonTemplate,
} from '../layout/todoTemplates.js';

class TodoAppView {
  constructor() {
    this.$kanbanTitle = $('#kanban-title');
    this.$todoappListContainer = $('.todoapp-list-container');
    this.$userAddBtnContainer = $('.add-user-button-container');
  }

  clearInput(memberId) {
    const $todoInput = $(`li[data-id="${memberId}"] .new-todo`);
    $todoInput.value = '';
  }

  renderTitle(teamName) {
    this.$kanbanTitle.innerHTML = kanbanTitleTemplate(teamName);
  }

  renderKanban(members) {
    this.$todoappListContainer.innerHTML = members
      .map(todoAppTemplate)
      .join('');
    members.forEach(member => this.renderTodoList(member));
    this.$todoappListContainer.innerHTML += userAddButtonTemplate();
  }

  renderTodoList(member) {
    const memberId = member._id;
    const todos = member.todoList;
    const $todoList = $(`li[data-id="${memberId}"] .todo-list`);
    $todoList.innerHTML = todos.map(todo => todoItemTemplate(todo)).join('');
  }

  activateEditMode() {}

  deactivateEditMode() {}
}

export const todoAppView = new TodoAppView();
