import { UserList } from '../component/user/UserList.js';

//todoList가 들어갈 컨테이너만 생성합니다.
//네이밍 당시 UserApp과 KanbanApp 중에 고민하였음.
export class KanbanApp {
  constructor(){
    this.userList = new UserList();
  }

  renderAll({team}) {
    this.userList.render(team);
  }
}
