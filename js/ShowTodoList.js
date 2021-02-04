import { listAssemble, MINIMUN_INPUT_LENGTH } from "./AddNewItem.js";
import { API } from "./API.js";

import {initAddTodoList} from "./AddTodoList.js"
import {initCheckTodoList} from "./CheckTodoList.js"
import {initUpdateTodoList} from "./UpdateTodoList.js"

import { initAddNewItem } from "./AddNewItem.js";
import { initTodolistButton } from "./ControlTodoButton.js";
import { initTodolistItems } from "./ControlTodoItems.js";

export const $todoApps = document.querySelector(".todoapp-list-container");
const $addUserButton = document.querySelector("#add-user-button");

export const teamId = location.hash.substr(1);

function initTodoLists() {
  $addUserButton.addEventListener("click", addNewMember);

  getTeamList();
  initAddTodoList();
  initCheckTodoList();
  initUpdateTodoList();
}

const addNewMember = async () => {
  const result = prompt("새로운 팀원 이름을 입력해주세요");
  if (result === null) return;
  if (result.length < MINIMUN_INPUT_LENGTH) {
    alert(`${MINIMUN_INPUT_LENGTH} 글자 이상 입력해주세요!`);
    return;
  }
  await API.postMember(teamId, result);
  getTeamList();
};

export const getTeamList = async () => {
  
  const team = await API.getTeam(teamId);
  const members = team.members;

  console.log(members);
  members.forEach(async (data) => {
    await assembleTodoList(data);
    console.log();
  });
  initTodolistItems($todoApps);
};

const assembleTodoList = async (data) => {
  const $todoApps = document.querySelector(".todoapp-list-container");
  const template = `
  <li class="todoapp-container" id=${data._id}>
          <h2>
            <span><strong>${data.name}</strong>'s Todo List</span>
          </h2>
          <div class="todoapp">
            <section class="input-container">
              <input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />
            </section>
            <section class="main">
              <ul class="todo-list"></ul>
            </section>
            <div class="count-container">
              <span class="todo-count">총 <strong>0</strong> 개</span>
              <ul class="filters">
                <li>
                  <a href="#all" class="selected">전체보기</a>
                </li>
                <li>
                  <a href="#priority">우선 순위</a>
                </li>
                <li>
                  <a href="#active">해야할 일</a>
                </li>
                <li>
                  <a href="#completed">완료한 일</a>
                </li>
              </ul>
              <button class="clear-completed">모두 삭제</button>
            </div>
          </div>
        </li>`;
  $todoApps.insertAdjacentHTML("afterbegin", template);

  const todoList = document.querySelector(`#${data._id}`);
  const li = todoList.querySelector(".todo-list");
  const filter = todoList.querySelector(".filters");

  data.todoList.forEach(async (item) => {
    li.appendChild(await assembleTodoItems(item));
  });

  // initTodolistButton(filter);
   
};

const assembleTodoItems = async (item) => {
  const li = listAssemble(item.contents);

  const checkbox = li.querySelector(".toggle");
  const span = li.querySelector("span.chip");
  const selecter = li.querySelector("select");

  li.setAttribute("id", item._id);
  if (item.isCompleted) {
    li.classList.add("completed");
    checkbox.setAttribute("checked", "");
  }

  if (item.priority !== "NONE") {
    if (item.priority === "FIRST") {
      span.classList.add("primary");
      span.innerText = "1순위";
    } else if (item.priority === "SECOND") {
      span.classList.add("secondary");
      span.innerText = "2순위";
    }
    selecter.style.display = "none";
  } else span.style.display = "none";
  return await li;
};

initTodoLists();
