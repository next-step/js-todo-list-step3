import { parseItem } from "../todo/todoItem.js";

export function User(inputId, inputName, inputTodoList = []) {
  const _id = inputId;
  const name = inputName;
  const todoList = inputTodoList ?? [];
  let active = false;

  this.addItem = (item) => todoList.push(item);
  this.activate = () => (active = true);
  this.inActivate = () => (active = false);
  this.matchId = (id) => _id == id;
  this.parseItem = () =>
    todoList.forEach((item, index) => (todoList[index] = parseItem(item)));

  this.getName = () => name;
  this.getId = () => _id;
  this.getTodoList = () => todoList;
  this.isActive = () => active;
}

export const UserTemplate = (user) => {
  return `<user-list-item key="${user.getId()}" data-_id="${user.getId()}" data-name="${user.getName()}" data-todolist data-active="${user.isActive()}">
  <button class="ripple  ${
    user.isActive() ? "active" : ""
  }" data-id="${user.getId()}" data-action="selectUser" selectuser="click">
    ${user.getName()}
  </button>
</user-list-item>

`;
};

export const userAddButton = (target) => {
  const button = document.createElement("li");
  button.classList.add("add-user-button-container");
  button.innerHTML = `
  <button id="add-user-button" class="ripple">
    <span class="material-icons">add</span>
  </button>`;
  target.appendChild(button);
};

export const parseUser = (user) => new User(user._id, user.name, user.todoList);
