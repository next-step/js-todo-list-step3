/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import API from './api.js';
import { $, $$ } from './constants.js';
import {
  todoAppContainer,
  makeAddUserButton,
  todoListItemTemplate,
} from './template.js';

class Kanban {
  constructor() {
    this.teamId = localStorage.getItem('teamId');
    this.API = new API();
    this.init();
  }

  async handleClickAddUserButton() {
    console.log('handleClickAddUserButton');
    const teamMemberName = prompt('새로운 팀원 이름을 입력해주세요');
    // TODO: 빈 문자열, white space만 있는 문자열 분리해서 처리할 것.
    if (teamMemberName === null || teamMemberName.length < 1) {
      alert('팀원 이름은 1글자 이상이어야 합니다.');
      return;
    }
    const response = await this.API.addTeamMember(this.teamId, teamMemberName);
    // TODO: render added user
    // TODO: try catch
    await this.render();
  }

  handleClickListContainer(event) {
    console.log('handleClickListContainer');
    const { target } = event;
    console.log(target);
  }

  async handleKeyupListContainer(event) {
    // TODO
    // 1) dblclick 이후 enter 이벤트 발생 시 오작동 여지
    // 2) try catch

    console.log('handleKeyUpListContainer');
    if (event.key !== 'Enter') return;
    if (!event.target.value || event.target.value.length < 1) return;

    const { target } = event;
    const { value } = target;
    const todoContainer = target.closest('li');
    const todoApp = target.closest('div');
    const todoList = todoApp.querySelector('.todo-list');
    const dataMemberId = todoContainer.getAttribute('data-member-id');

    const response = await this.API.addTeamMemberTodoItem(
      this.teamId,
      dataMemberId,
      value
    );
    const todoData = await response.json();
    todoList.insertAdjacentHTML('beforeend', todoListItemTemplate(todoData));
    event.target.value = '';
  }

  async addEvents() {
    console.log('kanban addEvents');
    const $addUserButton = $('#add-user-button');
    const $flexColumnContainer = $('.flex-column-container');
    // $flexColumnContainer.addEventListener(
    //   'click',
    //   this.handleClickListContainer.bind(this)
    //   // await this.handleClickListContainer.bind(this)
    // );
    $flexColumnContainer.addEventListener(
      'keyup',
      await this.handleKeyupListContainer.bind(this)
    );
    $addUserButton.addEventListener(
      'click',
      await this.handleClickAddUserButton.bind(this)
    );
  }

  async renderTodoAppContainers() {
    const response = await this.API.getTeamMemberList(this.teamId);
    const memberList = await response.json();
    const $todoAppListContainer = $('.todoapp-list-container');
    const $userTitle = $('#user-title');
    $userTitle.setAttribute('data-username', memberList.name);
    $userTitle.querySelector('strong').innerText = `${memberList.name}`;

    $todoAppListContainer.innerHTML = '';
    $todoAppListContainer.innerHTML = makeAddUserButton;
    // member 출력을 먼저 추가된 순서부터 하기 위한 reverse
    for (const member of memberList.members.reverse()) {
      $todoAppListContainer.insertAdjacentHTML(
        'afterbegin',
        todoAppContainer(member)
      );
    }
  }

  async render() {
    console.log('kanban render');
    await this.renderTodoAppContainers();
    await this.addEvents();
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
