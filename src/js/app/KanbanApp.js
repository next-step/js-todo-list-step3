import { MemberList } from '../component/member/MemberList.js';

export class KanbanApp {
  constructor(){
    this.memberList = new MemberList();
  }

  renderAll({team}) {
    this.memberList.render(team);
  }
}
