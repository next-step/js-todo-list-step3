import { memberStore, itemStore } from './store.js';
import { todoInput } from './todoInput.js';
import { todoList } from './todoList.js';
import { todoStatus } from './todoStatus.js';

import { MEMBER_EVENTS, ITEM_EVENTS } from './appEvents.js';

//TODOs
// 2. 삭제 기능

const $container = document.querySelector('.todoapp-list-container');
const $userTitle = document.getElementById('user-title');

const createTodoAppContainer = (name) => {
  const $todoAppContainer = document.createElement('li');
  $todoAppContainer.classList.add('todoapp-container');

  const $title = document.createElement('h2');
  $title.innerHTML = `<span><strong>${name}</strong>'s Todo List</span>`;

  const $todoApp = document.createElement('div');
  $todoApp.classList.add('todoapp');

  $todoAppContainer.appendChild($title);
  $todoAppContainer.appendChild($todoApp);

  return $todoAppContainer;
};

function createAddUserButton() {
  const $container = document.createElement('li');
  $container.classList.add('add-user-button-container');

  const $button = document.createElement('button');
  $button.id = 'add-user-button';
  $button.classList.add('ripple');
  $button.innerHTML = `<span class="material-icons">add</span>`;

  $container.appendChild($button);

  return $container;
}

function App(teamId) {
  const store = memberStore($container, teamId);
  const $addUserButton = createAddUserButton();

  function todoApp(member) {
    const $todoAppContainer = createTodoAppContainer(member.name);
    const inputComponent = todoInput($todoAppContainer).init();
    const listComponent = todoList($todoAppContainer);
    const statusComponent = todoStatus($todoAppContainer);

    const store = itemStore($todoAppContainer, teamId, member._id);
    store.fetchItems();

    // Add event listeners to todoApp container
    //TODO events from DOM
    $todoAppContainer.addEventListener(ITEM_EVENTS.CREATE, (e) => {
      store.createItem(e.detail);
    });

    $todoAppContainer.addEventListener(ITEM_EVENTS.REMOVE, (e) => {
      store.deleteItem(e.detail);
    });

    $todoAppContainer.addEventListener(ITEM_EVENTS.TOGGLE, (e) => {
      store.toggleItem(e.detail);
    });

    $todoAppContainer.addEventListener(ITEM_EVENTS.UPDATE, (e) => {
      store.updateItem(e.detail);
    });

    $todoAppContainer.addEventListener(ITEM_EVENTS.FILTER, (e) => {
      const items = store.setFilter(e.detail);
      render(items);
    });

    //event from store
    $todoAppContainer.addEventListener(ITEM_EVENTS.RENDER, (e) => {
      render(e.detail);
    });

    function render(items) {
      listComponent.loading();
      listComponent.refresh(items);
      statusComponent.updateCount(items.length);
    }

    return $todoAppContainer;
  }

  $addUserButton.addEventListener('click', () => {
    const result = prompt('새로운 팀원 이름을 입력해주세요');

    store.addMember(result); //TODO as event
  });

  function render(members) {
    $container.innerHTML = '';
    $container.appendChild($addUserButton);
    $addUserButton.before(...members.map((member) => todoApp(member)));
  }

  $container.addEventListener(MEMBER_EVENTS.RENDER, (e) => {
    render(e.detail);
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
new App(para.get('team')).init();
