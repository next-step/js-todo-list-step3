import { initInputContainer } from "./todoList/initInputContainer.js";
import { initTodoListMain } from "./todoList/initTodoListMain.js";
import { initCountContainer } from "./todoList/initCountContainer.js";
import { drawTodo } from "./drawTodo.js";
import { updateCountText } from "./todoList/updateCountText.js";

const todoListsContainer = document.querySelector("ul.todoapp-list-container");
const addTeamMemberButton = document.querySelector(
  "li.add-user-button-container"
);

function isValidMember({ _id, name, todoList }) {
  return _id !== undefined && name !== undefined && todoList !== undefined;
}

export function drawMember({ _id, name, todoList }) {
  if (!isValidMember({ _id, name, todoList })) return;

  const todoListContainer = document.createElement("li");
  todoListContainer.className = "todoapp-container";
  todoListContainer.id = _id;
  todoListContainer.innerHTML += `<h2><span><strong>${name}</strong>'s Todo List</span></h2>`;

  const todoListDiv = document.createElement("div");
  todoListDiv.className = "todoapp";
  todoListDiv.innerHTML += `<section class="input-container"><input class="new-todo" placeholder="할 일을 입력해주세요." autofocus /></section>`;

  const todoListMainSection = document.createElement("section");
  todoListMainSection.className = "main";

  const todoListUl = document.createElement("ul");
  todoListUl.className = "todo-list";
  for (const todo of todoList) {
    drawTodo(todoListUl, todo);
  }
  todoListMainSection.appendChild(todoListUl);
  todoListDiv.appendChild(todoListMainSection);
  todoListDiv.innerHTML += `
  <div class="count-container">
    <span class="todo-count">총 <strong>0</strong> 개</span>
    <ul class="filters">
      <li>
        <a class="all selected">전체보기</a>
      </li>
      <li>
        <a class="priority">우선 순위</a>
      </li>
      <li>
        <a class="active">해야할 일</a>
      </li>
      <li>
        <a class="completed">완료한 일</a>
      </li>
    </ul>
    <button class="clear-completed">모두 삭제</button>
  </div>
  `;

  initInputContainer(todoListDiv.querySelector("section.input-container"));
  initTodoListMain(todoListDiv.querySelector("section.main"));
  initCountContainer(todoListDiv.querySelector("div.count-container"));

  todoListContainer.appendChild(todoListDiv);
  todoListsContainer.insertBefore(todoListContainer, addTeamMemberButton);
  updateCountText(_id);
}
