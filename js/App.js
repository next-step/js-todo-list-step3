import HeaderTitle from './Header.js';
import TeamBoard from './TeamBoard.js';
import TodoBoard from './TodoBoard.js';

import { getTeam, addTeamMember } from '../api/team.js';
import { addUserButtonTemplate } from '../utils/template.js';

export default class App {
  constructor(currentPath) {
    this.headerTitle = new HeaderTitle();
    this.headerTitle.setState('Team');
    this.currentTeamId = location.search.split('=')[1];

    switch (currentPath) {
      case '/index.html':
        this.teamBoardInit();
        break;
      case '/kanban.html':
        if (this.currentTeamId) {
          this.todoBoardInit();
        }
        break;
      default:
        this.teamBoardInit();
    }
  }

  teamBoardInit() {
    this.teamBoard = new TeamBoard();
  }

  async todoBoardInit() {
    this.$todoAppListContainer = document.querySelector(
      '.todoapp-list-container'
    );
    this.$todoAppListContainer.innerHTML = '';

    this.teamInfo = await getTeam(this.currentTeamId);
    this.teamInfo.members.forEach((member) => {
      const $todoContainer = document.createElement('li');
      $todoContainer.id = member._id;
      $todoContainer.className = 'todoapp-container';
      new TodoBoard($todoContainer, member);
    });
    this.$todoAppListContainer.appendChild(this.addMemberButtonElement());
    this.$addUserButton = document.querySelector('#add-user-button');
    this.addNewMember();
  }

  addMemberButtonElement() {
    const $addUserButtonContainer = document.createElement('li');
    $addUserButtonContainer.className = 'add-user-button-container';
    $addUserButtonContainer.innerHTML = addUserButtonTemplate;
    return $addUserButtonContainer;
  }

  addNewMember() {
    this.$addUserButton.addEventListener('click', async () => {
      const result = prompt('새로운 팀원 이름을 입력해주세요');
      const newMemberName = result.trim();
      if (newMemberName) {
        await addTeamMember(this.currentTeamId, newMemberName);
        this.todoBoardInit();
      }
    });
  }
}
