/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import API from './api.js';

class Kanban {
  constructor() {
    this.teamId = localStorage.getItem('teamId');
    this.API = new API();
    this.init();
  }

  async handleClickAddUserButton() {
    console.log('handleClickAddUserButton');
    const teamMemberName = prompt('새로운 팀원 이름을 입력해주세요');
    if (teamMemberName === null || teamMemberName.length < 1) {
      alert('팀원 이름은 1글자 이상이어야 합니다.');
      return;
    }
    const response = await this.API.addTeamMember(this.teamId, teamMemberName);
    // render
  }

  async addEvents() {
    console.log('kanban addEvents');
    const $addUserButton = document.querySelector('#add-user-button');
    $addUserButton.addEventListener(
      'click',
      await this.handleClickAddUserButton.bind(this)
    );
  }

  render() {
    console.log('kanban render');
    this.addEvents();
  }

  init() {
    console.log('kanban init');
    const search = `id=${this.teamId}`;
    history.pushState('', '', `?${search}`);
    this.render();
  }
}

new Kanban();

// export default Kanban;
