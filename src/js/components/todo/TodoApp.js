import { todoApi } from "../../api/api.js";
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import { TodoFilter } from "./TodoFilter.js";

export default class TodoApp {
  constructor({ teamId, userId }) {
    this.teamId = teamId;
    this.userId = userId;
    this.todoData = [];
    this.todoCount = document
      .getElementById(this.userId)
      .querySelector(".todo-count strong");

    this.init();
  }

  init() {
    this.todoInput = new TodoInput({
      userId: this.userId,
      onCreateItem: this.createItem.bind(this),
    });

    this.todoList = new TodoList({
      userId: this.userId,
      todoData: this.todoData,
      onCheckItem: this.checkItem.bind(this),
      onEditItem: this.editItem.bind(this),
      onSetPriorityItem: this.setPriorityItem.bind(this),
      onDeleteItem: this.deleteItem.bind(this),
    });

    this.todoFilter = new TodoFilter({
      userId: this.userId,
      onFilterItem: this.filterItem.bind(this),
      onDeleteAllItems: this.deleteAllItems.bind(this),
    });

    this.getTodoData();
  }

  setUserId(userId) {
    this.userId = userId;
    this.getTodoData();
  }

  getTodoData() {
    this.todoList.isLoading();
    todoApi.get(this.teamId, this.userId).then((data) => {
      this.setState(data.todoList);
    });
  }

  setState(todoData) {
    this.todoData = todoData;
    this.setItem();
  }

  setItem() {
    if (this.filter === "active")
      return this.render(this.todoData.filter((data) => !data.isCompleted));
    if (this.filter === "completed")
      return this.render(this.todoData.filter((data) => data.isCompleted));
    if (this.filter === "priority") {
      const sortTodoData = this.todoData.slice();
      return this.render(
        sortTodoData.sort((a, b) => {
          return this.getPriorityNum(a) - this.getPriorityNum(b);
        })
      );
    }
    this.render(this.todoData);
  }

  getPriorityNum(data) {
    const priorityNum = {
      FIRST: 1,
      SECOND: 2,
      NONE: 3,
    };
    return priorityNum[data.priority];
  }

  createItem = async (contents) => {
    await todoApi.create(this.teamId, this.userId, contents);
    this.getTodoData();
  };

  checkItem = async (itemId) => {
    await todoApi.toggle(this.teamId, this.userId, itemId);
    this.getTodoData();
  };

  editItem = async (itemId, contents) => {
    await todoApi.modify(this.teamId, this.userId, itemId, contents);
    this.getTodoData();
  };

  setPriorityItem = async (itemId, priority) => {
    await todoApi.setPriority(this.teamId, this.userId, itemId, priority);
    this.getTodoData();
  };

  deleteItem = async (itemId) => {
    await todoApi.delete(this.teamId, this.userId, itemId);
    this.getTodoData();
  };

  deleteAllItems = async () => {
    await todoApi.deleteAll(this.teamId, this.userId);
    this.getTodoData();
  };

  filterItem(filter) {
    this.filter = filter;
    this.setItem();
  }

  render(todoData) {
    this.todoCount.innerHTML = todoData ? todoData.length : "0";
    this.todoList.setState(todoData);
  }
}
