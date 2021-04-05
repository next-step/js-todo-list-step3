import { memberStore, itemStore } from './store.js';
import { todoInput } from './todoInput.js';
import { todoList } from './todoList.js';
import { todoStatus } from './todoStatus.js';

import { MEMBER_EVENTS, ITEM_EVENTS } from './appEvents.js';

//TODOs
// 삭제 기능

function createTodoAppContainer(name) {
  const $todoAppContainer = document.createElement('li');
  $todoAppContainer.classList.add('todoapp-container');

  const $title = document.createElement('h2');
  $title.innerHTML = `<span><strong>${name}</strong>'s Todo List</span>`;

  const $todoApp = document.createElement('div');
  $todoApp.classList.add('todoapp');

  $todoAppContainer.appendChild($title);
  $todoAppContainer.appendChild($todoApp);

  return $todoAppContainer;
}

function todoAppComponent(teamId, member) {
  const $container = createTodoAppContainer(member.name);
  const store = itemStore($container, teamId, member._id);

  const inputComponent = todoInput($container, store).init();
  const listComponent = todoList($container, store);
  const statusComponent = todoStatus($container, store);

  $container.addEventListener(ITEM_EVENTS.RENDER, (e) => {
    const items = e.detail;
    listComponent.refresh(items);
    statusComponent.updateCount(items.length);
  });

  store.fetchItems();

  return $container;
}

function createAddMemberButton() {
  const $container = document.createElement('li');
  $container.classList.add('add-user-button-container');

  const $button = document.createElement('button');
  $button.id = 'add-user-button';
  $button.classList.add('ripple');
  $button.innerHTML = `<span class="material-icons">add</span>`;

  $container.appendChild($button);

  return $container;
}

function memberComponent(teamId) {
  const $container = document.querySelector('.todoapp-list-container');
  const $userTitle = document.getElementById('user-title');
  const $addUserButton = createAddMemberButton();
  const store = memberStore($container, teamId);

  function render(members) {
    $container.innerHTML = '';
    $container.appendChild($addUserButton);
    $addUserButton.before(
      ...members.map((member) => todoAppComponent(teamId, member))
    );
  }

  $container.addEventListener(MEMBER_EVENTS.RENDER, (e) => {
    render(e.detail);
  });

  $addUserButton.addEventListener('click', () => {
    const result = prompt('새로운 팀원 이름을 입력해주세요');

    store.addMember(result);
  });

  async function init() {
    const name = await store.fetchTeam(); //TODO
    $userTitle.innerHTML = `<span><strong>${name}</strong>'s Todo List</span>`;
  }

  return {
    init,
  };
}

const para = new URLSearchParams(window.location.search);
new memberComponent(para.get('team')).init();
