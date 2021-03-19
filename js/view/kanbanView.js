'use strict';

import { $ } from '../utils/dom.js';
import { kanbanTitleTemplate } from '../layout/teamTemplates.js';
import {
  todoAppTemplate,
  todoItemTemplate,
  userAddButtonTemplate,
} from '../layout/todoTemplates.js';
class KanbanView {
  constructor() {
    this.$kanbanTitle = $('#kanban-title');
    this.$todoappListContainer = $('.todoapp-list-container');
    this.$userAddBtnContainer = $('.add-user-button-container');
  }

  renderTitle(teamName) {
    this.$kanbanTitle.innerHTML = kanbanTitleTemplate(teamName);
  }

  renderKanban(members) {
    this.$todoappListContainer.innerHTML = members
      .map(todoAppTemplate)
      .join('');
    this.$todoappListContainer.innerHTML += userAddButtonTemplate();
  }

  renderTodoApp(member) {
    return;
  }
}

export default KanbanView;
