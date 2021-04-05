'use strict';

import { api } from '../api/api.js';
import { todoAppView } from '../view/todoAppView.js';
import { teamStore } from '../store/teamStore.js';
import { memberStore } from '../store/memberStore.js';
import { MESSAGE } from '../constant/message.js';

class KanbanController {
  constructor() {
    todoAppView.$todoappListContainer.addEventListener(
      'click',
      this.onClickTodoappListContainer
    );
  }

  onClickTodoappListContainer = ({ target }) => {
    if (target.matches('#add-user-button, .material-icons')) {
      this.addMember();
      return;
    }
  };

  async loadMemberTodoLists() {
    const currentTeamId = teamStore.loadCurrentTeam()._id;
    const currentTeam = await api.getTeam(currentTeamId);
    teamStore.setCurrentTeam(currentTeam);
    memberStore.setMembers(currentTeam.members);
    todoAppView.renderTitle(currentTeam.name);
    todoAppView.renderKanban(memberStore.getMembers());
  }

  async addMember() {
    const memberName = prompt(MESSAGE.ADD_USER);
    if (!memberName) return;
    const teamId = teamStore.getCurrentTeam()._id;
    await api.addMember(teamId, memberName);
    this.loadMemberTodoLists();
  }
}

export default KanbanController;
