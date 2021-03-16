import { renderTodo } from './renderTodo.js';

const addUserButtonTemplate = () => {
  return `<li class="add-user-button-container">
            <button id="add-user-button" class="ripple">
              <span class="material-icons">add</span>
            </button>
          </li>`;
};

const todoContainerTemplate = ({ _id, name }) => {
  return `<li id=${_id} class="todoapp-container">
            <h2>
              <span><strong>${name}</strong>'s Todo List</span>
            </h2>
            <div class="todoapp">
              <section class="input-container">
                <input
                  class="new-todo"
                  placeholder="할 일을 입력해주세요."
                  autofocus
                />
              </section>
              <section class="main">
                <ul class="todo-list"></ul>
              </section>
              <div class="count-container">
                <span class="todo-count">총 <strong>0</strong> 개</span>
                <ul class="filters">
                  <li>
                    <a href="#all" class="all filter selected">전체보기</a>
                  </li>
                  <li>
                    <a href="#active" class="active filter">해야할 일</a>
                  </li>
                  <li>
                    <a href="#completed" class="completed filter">완료한 일</a>
                  </li>
                </ul>
                <button class="clear-completed">모두 삭제</button>
              </div>
            </div>
          </li>`;
};

export const renderMember = (teamId, members) => {
  const $todoListContainer = document.querySelector('.todoapp-list-container');

  if (!members.length) {
    $todoListContainer.innerHTML = addUserButtonTemplate();
    return;
  }

  $todoListContainer.innerHTML =
    members.map((member) => todoContainerTemplate(member)).join('') +
    addUserButtonTemplate();

  members.forEach((member) => renderTodo(member._id, member.todoList));
};
