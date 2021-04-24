/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import API from './api.js';
import { $, $$ } from './constants.js';
import { todoAppContainer, makeAddUserButton } from './template.js';

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
    if (event.key !== 'Enter') return;

    // input enter return
    // 이후 고려할 사항: dblclick 이후 enter 이벤트 발생 시 오작동 여지
    if (!event.target.value || event.target.value.length < 1) return;

    const li = event.target.closest('li');
    const memberId = li.getAttribute('data-member-id');
    const { value } = event.target;

    event.target.value = '';
    const response = await this.API.addTeamMemberTodoItem(
      this.teamId,
      memberId,
      value
    );
    await console.log(response);
    // 해야 할 일
    // 1. li 태그로부터 id 받기
    // 2. input 값 받기
    // 3. input 값 비우기
    // 5. post 요청 보내주기

    // 4. todo 추가하기 (html에만) // todo item id key를 받아와야함함
    // try catch
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
