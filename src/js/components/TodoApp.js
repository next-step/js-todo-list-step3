import { todoAppTemplate, todoFilterTemplate, todoTemplate } from "@js/template";
import { getEl, pipe } from "@js/util";
import { getUsers } from "@lib/api";
import { FILTER_TYPE } from "@constants/constant";

import TodoUserList from "./TodoUserList";
import TodoInput from "./TodoInput";
import TodoItemList from "./TodoItemList";
import TodoFilters from "./TodoFilters";

class TodoApp {
  constructor({ _id, name, todoList, container, store }) {
    this.todoId = _id;
    this.name = name;
    this.todoList = todoList;
    this.container = container;
    this.store = store;
    this.init();
  }

  async init() {
    this.container.innerHTML += todoAppTemplate(this.todoId, this.name, this.todoList.length);
    console.log(getEl(`#${this.todoId}`));
    // const { data: _users } = await getUsers();
    // const [selectedUser] = _users;

    // this.store.on(["selectedUser", "selectedUser.todoList", "filter"], this.updateTodoListViewPipe.bind(this));
    // this.store.on(["selectedUser", "users"], this.updateUserListViewPipe.bind(this));
    // this.store.set({
    //   selectedUser: { ...selectedUser },
    //   users: [..._users],
    //   filter: FILTER_TYPE.ALL,
    // });

    // new TodoUserList(this.store);
    // new TodoInput(this.store);
    // new TodoItemList(this.store);
    // new TodoFilters(this.store);
  }

  updateTodoListViewPipe() {
    pipe(this._getTodoListData.bind(this), this._renderTodoList.bind(this))();
  }

  updateUserListViewPipe() {
    pipe(this._getUserListData.bind(this), this._renderUserList.bind(this))();
  }

  _getTodoListData() {
    const { selectedUser, filter } = this.store.get();

    let onFilteringTodoList = selectedUser.todoList;
    if (filter === FILTER_TYPE.ACTIVE) onFilteringTodoList = selectedUser.todoList.filter((item) => !item.isCompleted);
    if (filter === FILTER_TYPE.COMPLETED) onFilteringTodoList = selectedUser.todoList.filter((item) => item.isCompleted);

    return { onFilteringTodoList };
  }

  _getUserListData() {
    const { selectedUser, users } = this.store.get();
    return { selectedUser, users };
  }

  _renderTodoList({ onFilteringTodoList }) {
    const todoListTemplate = onFilteringTodoList.map((todoItem) => todoTemplate(todoItem)).join("");

    this.todoListEl.innerHTML = todoListTemplate;
    this.todoCountEl.innerText = onFilteringTodoList.length;
  }

  _renderUserList({ selectedUser, users }) {
    const userListTemplate = users.map(({ _id, name }) => userTemplate({ _id, name, isSelected: selectedUser._id === _id })).join("");

    this.userNameEl.innerText = selectedUser.name;
    this.userListEl.innerHTML = userListTemplate + userListActionButtonTemplate();
  }
}

export default TodoApp;
