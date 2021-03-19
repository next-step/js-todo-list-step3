'use strict';

import { todoAppView } from '../view/todoAppView.js';
import teamApi from '../api/teamApi.js';
import { teamStore } from '../store/teamStore.js';
import { memberStore } from '../store/memberStore.js';

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
    const currentTeam = await teamApi.getTeam(currentTeamId);
    teamStore.setCurrentTeam(currentTeam);
    memberStore.setMembers(currentTeam.members);
    todoAppView.renderTitle(currentTeam.name);
    todoAppView.renderKanban(memberStore.getMembers());
  }

  async addMember() {
    // 멤버이름 입력
    const memberName = prompt('추가할 멤버 이름을 작성해주세요.');
    const currentTeam = teamStore.getCurrentTeam();
    if (!memberName) return;
    // api, member 추가 요청
    await teamApi.addMember(currentTeam._id, memberName);
    this.loadMemberTodoLists();
  }
}

export default KanbanController;
