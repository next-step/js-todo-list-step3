import api from './utils/api.js';
import { getUrlParams } from './utils/utils.js';
import { teamHeader, addMemberButton } from './utils/template.js';
import { $KANBAN_HEADER, $KANBAN } from './utils/htmlElements.js';
import { MemberTodoList } from './components/index.js';

// Team ID, Member List
class Kanban {
  constructor() {
    window.addEventListener('load', () => {
      const param = getUrlParams();
      this.initKanban(param.team);
    });
  }

  async initKanban(teamId) {
    this.teamId = teamId;
    await this.teamMemberTodo();
    this.setKanbanHeader();
  }

  async teamMemberTodo() {
    this.teamMemberData = await api.fetchTeamMember(this.teamId);
    this.teamMembersTodoList = this.teamMemberData.members.map(memberInfo => {
      const $element = document.createElement('li');
      $element.className = `todoapp-container`;
      $KANBAN.appendChild($element);
      return new MemberTodoList({
        $element,
        teamId: this.teamId,
        ...memberInfo
      });
    });

    // 멤버 추가 버튼 빼내기
    const $addButtonContainer = document.createElement('li');
    $addButtonContainer.className = 'add-user-button-container';
    $addButtonContainer.innerHTML = addMemberButton;
    $KANBAN.appendChild($addButtonContainer);
  }

  setKanbanHeader() {
    const { _id, name } = this.teamMemberData;
    $KANBAN_HEADER.dataset.username = `team-${_id}`;
    $KANBAN_HEADER.innerHTML = teamHeader(name);
  }
}

new Kanban();
