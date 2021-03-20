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

  renderTodoList(member, todos = member.todoList) {
    const memberId = member._id;
    const $todoList = $(`li[data-id="${memberId}"] .todo-list`);
    $todoList.innerHTML = todos.map(todo => todoItemTemplate(todo)).join('');
  }

  activateEditMode(target) {
    const $todoItem = target.closest('.todo-list-item');
    $todoItem.classList.add('editing');
  }

  deactivateEditMode(target) {
    const $todoItem = target.closest('.todo-list-item');
    const $editInput = target.closest('.edit');
    const text = $('.todo-list-item__contents', $todoItem).innerText;
    $editInput.value = text;
    $todoItem.classList.remove('editing');
  }

  changeFilterBtn(target) {
    const currentFilter = target.closest('.filters');
    const currentBtn = $('.selected', currentFilter);
    currentBtn.classList.remove('selected');
    target.classList.add('selected');
  }
}

export const todoAppView = new TodoAppView();
