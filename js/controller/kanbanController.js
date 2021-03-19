'use strict';

import KanbanView from '../view/kanbanView.js';
import teamApi from '../api/teamApi.js';
import { teamStore } from '../store/teamStore.js';
import { memberStore } from '../store/memberStore.js';

class KanbanController {
  constructor() {
    this.kanbanView = new KanbanView();
    this.kanbanView.$todoappListContainer.addEventListener(
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

  async loadMemberTodo() {
    const currentTeamId = teamStore.loadCurrentTeam()._id;
    const currentTeam = await teamApi.getTeam(currentTeamId);
    teamStore.setCurrentTeam(currentTeam);
    memberStore.setMembers(currentTeam.members);
    this.kanbanView.renderTitle(currentTeam.name);
    this.kanbanView.renderKanban(memberStore.getMembers());
  }

  async addMember() {
    // 멤버이름 입력
    const memberName = prompt('추가할 멤버 이름을 작성해주세요.');
    const currentTeam = teamStore.getCurrentTeam();
    if (!memberName) return;
    // api, member 추가 요청
    await teamApi.addMember(currentTeam._id, memberName);
    this.loadMemberTodo();
  }
}

export default KanbanController;
