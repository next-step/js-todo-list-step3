import App from './components/app.js';
import {
  addTeam,
  addTeamMember,
  getTeamList, getTeamMembers
} from './util/api.js';
import {
  kanbanBoard,
  teamBoard,
} from './constant/template.js'
import {toKanban} from "./util/router.js";
import Team from "./components/Team.js";
import {TodoList} from "./TodoList.js";
import User from "./components/User.js";

class Renderer {
  constructor(app) {
    this.app = app;
  }

  render() {
    this._render();
  }

  _render() {
    console.log('must be override');
  }
}


class DOMRenderer extends Renderer {
  constructor(id, app) {
    super(app);
    this.init(id);
    this.teamId = null;
    this.$app = document.querySelector('#' + id);
    this.$title = this.$app.querySelector('#user-title strong');
    this.$teamList = this.$app.querySelector('.team-list-container');
    this.$todoList = this.$app.querySelector('.todoapp-list-container');
    this.bindEvents();
  }

  async init() {
    const teamList = await getTeamList();
    this.app = App.load(teamList);
    this.render();
  }

  bindEvents() {
    this.$teamList.addEventListener('click', this.handleTemBoard);
  }

  handleTemBoard = (e) => {
    const {id, name} = e.target.closest('div').dataset;
    if (typeof id === 'undefined') return false;
    this.goKanBanBoard(id, name);
  }

  handleCreateTeam = async () => {
    let teamName = prompt('팀 이름을 입력해주세요');
    if (teamName.length < 3) {
      alert('User의 이름은 최소 2글자 이상이어야 합니다.');
      return;
    }
    try {
      const newTeamInfo = await addTeam(teamName);
      this.$teamList.lastElementChild.insertAdjacentHTML('beforebegin', teamBoard.teamCard(newTeamInfo));
    } catch (err) {
      console.error(err);
    }
  }

  handleCreateTeamMember = async (e) => {
    if (e.target.closest('#add-user-button') === null) return;
    const name = prompt('추가하고 싶은 이름을 입력해주세요.');
    try {
      if (name.length < 3) {
        alert('User의 이름은 최소 2글자 이상이어야 합니다.');
        return;
      }

      const resData = await addTeamMember(this.teamId, name);
      const user = User.get(resData._id, resData.name);
      this.currentTeam.addUser(user);
      this.render();
    } catch (err) {
      console.error(err);
    }
  }

  goKanBanBoard(id, name) {
    toKanban({id, name});
    this.$teamList.innerHTML = '';
    this.$title.innerHTML = history.state.name;
    this.teamId = history.state.id;
    this._render();
  }

  addCreateCard(el) {
    if (el.classList.contains('team-list-container')) {
      const addCard = document.createElement('div');
      addCard.classList.add('add-team-button-container');
      addCard.innerHTML = teamBoard.addCard;
      addCard.addEventListener('click', this.handleCreateTeam);
      el.appendChild(addCard);
      return;
    }
    const addCard = document.createElement('li');
    addCard.classList.add('add-user-button-container');
    addCard.innerHTML = kanbanBoard.addTodoList;
    addCard.addEventListener('click', this.handleCreateTeamMember);
    el.appendChild(addCard);
  }


  async makeKanbanList(teamId) {
    this.$todoList.innerHTML = '';
    try {
      const memberList = await getTeamMembers(teamId);
      this.currentTeam = Team.load(memberList);
      this.currentTeam.forEach(member => {
        new TodoList(this.$todoList, member);
      })
      this.addCreateCard(this.$todoList);
    } catch (e) {
      console.error(e)
    }
  }

  makeTeamBoard() {
    const teams = this.app.getTeams();
    teams.forEach((team) => {
      this.$teamList.insertAdjacentHTML('beforeend', teamBoard.teamCard(team.getInfo()));
    });
    this.addCreateCard(this.$teamList);
  }

  _render() {
    if (this.teamId !== null) {
      this.makeKanbanList(this.teamId);
      return;
    }
    this.makeTeamBoard();
  }
}

window.onpopstate = function () {
  location.reload();
}

new DOMRenderer('app', new App());
