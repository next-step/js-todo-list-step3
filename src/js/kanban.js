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
  selectOptionTemplate,
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
    await this.renderTodoAppContainers();
    // TODO: try catch
  }

  async changeInputValue(event) {
    const { target } = event;
    const $todoListItem = target.closest('.todo-list-item');
    const dataMemberId = target
      .closest('.todoapp-container')
      .getAttribute('data-member-id');
    const response = await this.API.changeTeamMemberTodoItem(
      this.teamId,
      dataMemberId,
      $todoListItem.id,
      target.value
    );
    const $label = target.closest('.editing').querySelector('.label-value');

    $label.innerText = event.target.value;
    target.setAttribute('value', event.target.value);
    $todoListItem.classList.remove('editing');
  }

  async editInputValue(event) {
    const { target } = event;
    const $todoListItem = target.closest('.todo-list-item');
    const originalValue = target.getAttribute('value');

    if (event.key === 'Enter') {
      await this.changeInputValue(event);
      return;
    }
    if (event.key === 'Escape') {
      event.target.value = originalValue;
      target.setAttribute('value', originalValue);
      $todoListItem.classList.remove('editing');
    }
  }

  async handleKeyupListContainer(event) {
    // TODO
    // 1) dblclick 이후 enter 이벤트 발생 시 오작동 여지
    // 2) try catch

    console.log('handleKeyUpListContainer');
    const { target } = event;
    const { value } = target;

    if (target.className === 'edit') {
      await this.editInputValue(event);
      return;
    }
    if (event.key !== 'Enter') return;
    if (!event.target.value || event.target.value.length < 1) return;
    const $todoContainer = target.closest('li');
    const $todoApp = target.closest('div');
    const $todoList = $todoApp.querySelector('.todo-list');
    const dataMemberId = $todoContainer.getAttribute('data-member-id');

    const response = await this.API.addTeamMemberTodoItem(
      this.teamId,
      dataMemberId,
      value
    );
    const todoData = await response.json();
    // TODO: fix? 최초에만 render가 2번?
    $todoList.insertAdjacentHTML('beforeend', todoListItemTemplate(todoData));
    event.target.value = '';
  }

  async deleteTodoItem(target) {
    const $todoListItem = target.closest('.todo-list-item');
    const $todoListItemParent = $todoListItem.closest('ul');
    const $todoListItemId = $todoListItem.id;
    const $todoApp = target.closest('.todoapp-container');
    const dataMemberId = $todoApp.getAttribute('data-member-id');

    await this.API.deleteTeamMemberTodoItem(
      this.teamId,
      dataMemberId,
      $todoListItemId
    );
    $todoListItemParent.removeChild($todoListItem);
  }

  async toggleTodoItem(target) {
    console.log('toggleTodoItem');
    const $todoListItem = target.closest('.todo-list-item');
    const todoListItemId = $todoListItem.id;
    const $todoApp = target.closest('.todoapp-container');
    const dataMemberId = $todoApp.getAttribute('data-member-id');
    $todoListItem.classList.toggle('completed');
    const response = await this.API.toggleTeamMemberTodoItem(
      this.teamId,
      dataMemberId,
      todoListItemId
    );
  }

  async deleteAllTodoItem(target) {
    console.log(target);
    const $todoApp = target.closest('.todoapp-container');
    const dataMemberId = $todoApp.getAttribute('data-member-id');
    const $todoList = $todoApp.querySelector('.todo-list');
    const response = await this.API.clearTeamMemberTodoItem(
      this.teamId,
      dataMemberId
    );
    $todoList.innerHTML = '';
  }

  async handleClickListContainer(event) {
    const { target } = event;

    if (
      target.className !== 'destroy' &&
      target.className !== 'toggle' &&
      target.tagName !== 'A' &&
      target.tagName !== 'BUTTON'
    )
      return;
    console.log('handleClickListContainer');
    if (target.tagName === 'A') {
      await this.handleClickFilters(event);
      return;
    }
    if (target.className === 'destroy') {
      await this.deleteTodoItem(target);
      return;
    }
    if (target.className === 'toggle') {
      await this.toggleTodoItem(target);
      return;
    }
    if (target.className === 'clear-completed') {
      await this.deleteAllTodoItem(target);
    }
  }

  handleDblclick(event) {
    if (event.target.className !== 'label') return;

    const { target } = event;
    const $todoListItem = target.closest('.todo-list-item');

    $todoListItem.classList.add('editing');
  }

  async handleSelectChip(event) {
    if (event.target.tagName !== 'SELECT') return;

    const { target } = event;
    const container = target.closest('.chip-container');
    const $todoListItem = target.closest('.todo-list-item');
    const todoListItemId = $todoListItem.id;
    let response;

    const dataMemberId = target
      .closest('.todoapp-container')
      .getAttribute('data-member-id');
    console.log(dataMemberId);

    container.innerHTML = '';
    container.innerHTML = selectOptionTemplate(target.selectedIndex);
    switch (target.selectedIndex) {
      case 0:
        response = await this.API.changeTeamMemberTodoItemPriority(
          this.teamId,
          dataMemberId,
          todoListItemId,
          'FIRST'
        );
        break;
      case 1:
        response = await this.API.changeTeamMemberTodoItemPriority(
          this.teamId,
          dataMemberId,
          todoListItemId,
          'SECOND'
        );
        break;
      case 2:
        response = await this.API.changeTeamMemberTodoItemPriority(
          this.teamId,
          dataMemberId,
          todoListItemId,
          'NONE'
        );
        break;
      default:
        console.log('error');
        break;
    }
  }

  renderTodoItem($todoList, memberTodoList, option) {
    $todoList.innerHTML = '';
    for (const todoItem of memberTodoList.reverse()) {
      if (
        (todoItem.priority !== 'NONE' && option === 'priority') ||
        (todoItem.isCompleted === false && option === 'active') ||
        (todoItem.isCompleted === true && option === 'completed') ||
        option === 'all'
      )
        $todoList.insertAdjacentHTML(
          'afterbegin',
          todoListItemTemplate(todoItem)
        );
    }
  }

  async changeTodosByFilter(event) {
    const { target } = event;
    const filterAttributeValue = target.getAttribute('href').slice(1);
    const $todoAppContainer = target.closest('.todoapp-container');
    const $todoList = $todoAppContainer.querySelector('.todo-list');
    const dataMemberId = $todoAppContainer.getAttribute('data-member-id');
    const response = await this.API.getTeamMemberTodoList(
      this.teamId,
      dataMemberId
    );

    const memberTodoList = (await response.json()).todoList;
    this.renderTodoItem($todoList, memberTodoList, filterAttributeValue);
  }

  changeFilterUI(event) {
    const { target } = event;
    const filterList = target.closest('ul');
    const filters = filterList.querySelectorAll('li');
    filters.forEach(filter => {
      filter.querySelector('a').classList.remove('selected');
    });
    target.classList.add('selected');
  }

  async handleClickFilters(event) {
    console.log('handleClickFilters');
    this.changeFilterUI(event);
    await this.changeTodosByFilter(event);
  }

  async addEvents() {
    console.log('kanban addEvents');
    const $addUserButton = $('#add-user-button');
    const $flexColumnContainer = $('.flex-column-container');
    $flexColumnContainer.addEventListener(
      'click',
      await this.handleClickListContainer.bind(this)
    );
    $flexColumnContainer.addEventListener(
      'change',
      await this.handleSelectChip.bind(this)
    );
    $flexColumnContainer.addEventListener(
      'keyup',
      await this.handleKeyupListContainer.bind(this)
    );
    $flexColumnContainer.addEventListener(
      'dblclick',
      this.handleDblclick.bind(this)
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

  async init() {
    console.log('kanban init');
    const search = `id=${this.teamId}`;
    history.pushState('', '', `?${search}`);
    await this.render();
  }
}

new Kanban();

// export default Kanban;
