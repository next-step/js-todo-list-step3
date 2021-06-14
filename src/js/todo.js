import { $, $$, METHOD, API } from './util.js';

const $todoApps = $('.todoapp-list-container');

const $todoInput = $('.new-todo');

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

export const toDoRender = items => {
  const $todoLists = $todoApps.querySelectorAll('.todoapp-container');
  $todoLists.forEach(list => {
    const $todoList = list.querySelector('.todo-list');
    $todoList.innerHTML += '';
    items.todoList.map(item => {
      if (items._id === list.dataset.memberId)
        $todoList.innerHTML += toDoItemTemplate(item)
    });
  }
  );
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
  toDoRender(toDoItems);
};

$todoInput.addEventListener('keydown', ({ key, target }) => {
  if (key === 'Enter') {
    if (target.value.length < 2) {
      alert('2글자 이상이어야 합니다.');
    } else {
      AddToDo(target.value);
      target.value = "";
    }
  }
  const targetId = $('button.active').dataset.id;
  const toDoItems = loadToDoItems(targetId, API);
  toDoRender(toDoItems);
});