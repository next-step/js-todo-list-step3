import { memberStore, itemStore } from './store.js';
import { todoInput } from './todoInput.js';
import { todoList } from './todoList.js';
import { todoStatus } from './todoStatus.js';

//TODOs
// 1. CustomEvent 상수화
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
    $todoAppContainer.addEventListener('create', (e) => {
      store.createItem(e.detail);
    });

    $todoAppContainer.addEventListener('remove', (e) => {
      store.deleteItem(e.detail);
    });

    $todoAppContainer.addEventListener('toggle', (e) => {
      store.toggleItem(e.detail);
    });

    $todoAppContainer.addEventListener('update', (e) => {
      store.updateItem(e.detail);
    });

    $todoAppContainer.addEventListener('filter', (e) => {
      const items = store.setFilter(e.detail);
      render(items);
    });

    //event from store
    $todoAppContainer.addEventListener('render', (e) => {
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

    store.addMember(result);
  });

  function render(members) {
    $container.innerHTML = '';
    $container.appendChild($addUserButton);
    $addUserButton.before(...members.map((member) => todoApp(member)));
  }

  $container.addEventListener('render', (e) => {
    render(e.detail);
  });

  async function init() {
    //TODO
    const name = await store.fetchTeam();
    $userTitle.innerHTML = `<span><strong>${name}</strong>'s Todo List</span>`;
    render(store.getMembers());
  }

  return {
    init,
  };
}

const para = new URLSearchParams(window.location.search);
new App(para.get('team')).init();
