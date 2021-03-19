'use strict';

import KanbanView from '../view/kanbanView.js';
import { teamStore } from '../store/teamStore.js';
class KanbanController {
  constructor() {
    this.kanvanView = new KanbanView();
  }

  init() {
    console.log('KanbanController-init');
    console.log(teamStore.getTeams());
    // this.kanvanView.renderTitle(teamStore.getCurrentTeam());
  }

  test() {
    return teamStore.getTeams();
  }
}

export default KanbanController;
