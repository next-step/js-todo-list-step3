import { $, $$, METHOD, API } from './util.js';

const $todoApps = $('.todoapp-list-container');
const urlParams = new URLSearchParams(location.search);
const teamId = urlParams.get('id');

const toDoItemTemplate = (item) => {
  return (
    `
    <li class="todo-list-item" data-id="${item._id}">
      <div class="view">
        <input class="toggle" type="checkbox" />
        <label class="label">
          <div class="chip-container">
            <select class="chip select">
              <option value="0" selected>순위</option>
              <option value="1">1순위</option>
              <option value="2">2순위</option>
            </select>
          </div>
          ${item.contents}
        </label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="완료된 타이틀" />
    </li>
    `
  );
}

export const toDoRender = (items, memberId) => {
  const $todoContainer = $todoApps.querySelector(`.todoapp-container[data-member-id=${memberId}]`);
  const $todoList = $todoContainer.querySelector('.todo-list');
  $todoList.innerHTML = '';
  items.todoList.map(item => {
    $todoList.innerHTML += toDoItemTemplate(item)
  });
}

export const loadToDoItems = async (teamId, memberId, { TODOS }) => {
  const toDoItems = await fetch(TODOS(teamId, memberId))
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .catch(error => console.log(error))
  toDoRender(toDoItems, memberId);
};

export const AddToDo = (contents, memberId, { ITEMS }, { POST }) => {
  fetch(ITEMS(teamId, memberId), {
    method: POST,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: contents
    })
  });
}

$todoApps.addEventListener('keydown', ({ key, target }) => {
  const memberId = target.closest('.todoapp-container').dataset.memberId;
  if (key === 'Enter') {
    if (target.value.length < 2) {
      alert('2글자 이상이어야 합니다.');
    } else {
      AddToDo(target.value, memberId, API, METHOD);
      target.value = "";
      loadToDoItems(teamId, memberId, API);
    }
  }
});