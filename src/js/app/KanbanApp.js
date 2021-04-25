import { MemberList } from '../component/member/MemberList.js';
import { $ } from '../util/domSelection.js';

export class KanbanApp {
  constructor() {
    this.memberList = new MemberList();
  }

  renderAll({ team }) {
    //Title 설정
    $('#kanban-title strong').textContent = team.name;
    //teamId 세팅
    $('ul.todoapp-list-container').dataset.teamid = team._id;

    team.members.forEach((member) => {
      this.memberList.render(member);
    });
  }
}
