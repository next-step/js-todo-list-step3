import api from './utils/api.js';
import { getUrlParams } from './utils/utils.js';
import { teamHeader, addMemberButton } from './utils/template.js';
import { $KANBAN_HEADER, $KANBAN } from './utils/htmlElements.js';
import { MemberTodoList, MemberAddButton } from './components/index.js';

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
    this.teamMemberData = await api.fetchTeamMember(this.teamId);
    this.setKanbanHeader();
    this.render();
  }

  async teamMemberTodo() {
    this.teamMembersTodoList = this.teamMemberData.members.map(memberInfo => {
      const $element = document.createElement('li');
      $element.className = `todoapp-container`;
      $KANBAN.appendChild($element);
      return new MemberTodoList({
        $element,
        teamId: this.teamId,
        ...memberInfo,
        onDragEnd: this.handleDragEnd.bind(this)
      });
    });
  }

  setKanbanHeader() {
    const { _id, name } = this.teamMemberData;
    $KANBAN_HEADER.dataset.username = `team-${_id}`;
    $KANBAN_HEADER.innerHTML = teamHeader(name);
  }

  setMemberAddButton() {
    const $addButtonContainer = document.createElement('li');
    $addButtonContainer.className = 'add-user-button-container';
    $addButtonContainer.innerHTML = addMemberButton;
    $KANBAN.appendChild($addButtonContainer);
    new MemberAddButton({
      $element: $KANBAN.querySelector('.add-user-button-container'),
      teamId: this.teamId,
      onClick: async () => {
        const newTeamData = await api.fetchTeamMember(this.teamId);
        this.setState(newTeamData);
      }
    });
  }

  async handleDragEnd(isDragEnd) {
    if (isDragEnd) {
      const newTeamData = await api.fetchTeamMember(this.teamId);
      this.setState(newTeamData);
    }
  }

  async render() {
    $KANBAN.innerHTML = '';
    await this.teamMemberTodo();
    this.setMemberAddButton();
  }

  setState(newTeamData) {
    this.teamMemberData = newTeamData;
    this.render();
  }
}

new Kanban();
