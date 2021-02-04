import { API } from "../API.js";

import {initAddTodoList} from "./AddItem.js"
import {initCheckTodoList} from "./CheckItem.js"
import {initUpdateTodoList} from "./UpdateItem.js"
import {initDeleteTodoList} from "./DeleteItem.js"
import {initPrioritizeTodoList} from "./PrioritizeItem.js"
import {initDeleteAllTodoList} from "./DeleteAllItems.js"
import {initAddMember} from "./AddMember.js"

import { initTodolistButton, changeByHash } from "./ControlTodoButton.js";

export const $todoApps = document.querySelector(".todoapp-list-container");
export const teamId = location.hash.substr(1,9);

const initTodoLists = () => {
  getTeamList();
  initAddMember();
  initAddTodoList();
  initCheckTodoList();
  initUpdateTodoList();
  initDeleteTodoList();
  initPrioritizeTodoList();
  initDeleteAllTodoList();
  initTodolistButton();
}


export const getTeamList = async () => {
  
  const team = await API.getTeam(teamId);
  const members = team.members;

  clearTodoLists();
  
  await members.forEach(async (data) => {
    assembleTodoList(data);
  })

  const currenthash = location.hash.substr(11);
  changeByHash(currenthash);
  
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
                <li class="view-all">
                  <a href="#${teamId}#all">전체보기</a>
                </li>
                <li class="view-priority">
                  <a href="#${teamId}#priority">우선 순위</a>
                </li>
                <li class="view-active">
                  <a href="#${teamId}#active">해야할 일</a>
                </li>
                <li class="view-completed">
                  <a href="#${teamId}#completed">완료한 일</a>
                </li>
              </ul>
              <button class="clear-completed">모두 삭제</button>
            </div>
          </div>
        </li>`;
  $todoApps.insertAdjacentHTML("afterbegin", template);

  const todoList = document.querySelector(`#${data._id}`);
  const li = todoList.querySelector(".todo-list");

  data.todoList.forEach(async (item) => {
    li.appendChild(await assembleTodoItems(item));
  });

  
   
};

const assembleTodoItems = async (item) => {
  const li = itemAssemble(item.contents);
  li.classList.add('selected');

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
  return li;
};

const clearTodoLists = () =>{
  const cards = $todoApps.querySelectorAll('.todoapp-container');
  cards.forEach((item)=>{
    item.remove();
  })
  
}

function itemAssemble(content) {
  const li = document.createElement("li");
  
  const listTemplate = `<div class="view">
                        <input class="toggle" type="checkbox"/>
                        <label class="label">
                          <select class="chip">
                            <option value="0" selected>순위</option>
                            <option value="1">1순위</option>
                            <option value="2">2순위</option>
                          </select>
                          <span class="chip">1순위</span>
                          <span class="text">${content}</span>
                        </label>
                        <button class="destroy" ></button>
                      </div>
                      <input class="edit" value="${content}" />`;

  li.innerHTML = listTemplate;
  
  return li;
}


initTodoLists();
