'use strict';

import { $ } from '../utils/dom.js';
import { kanbanTitleTemplate } from '../layout/templates.js';
class KanbanView {
  constructor() {
    this.$kanbanTitle = $('#kanban-title');
  }

  renderTitle(teamName) {
    this.$kanbanTitle.innerHTML = kanbanTitleTemplate(teamName);
  }
}

export default KanbanView;
