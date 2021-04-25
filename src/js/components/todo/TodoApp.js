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
    this.todoFilterButton = document.querySelectorAll(".filters li a");

    this.init();
  }

  init() {
    this.todoInput = new TodoInput({
      userId: this.userId,
      onCreateItem: this.handleCreateItem.bind(this),
    });

    this.todoList = new TodoList({
      userId: this.userId,
      todoData: this.todoData,
      onCheckItem: this.handleCheckItem.bind(this),
      onEditItem: this.handleEditItem.bind(this),
      onSetPriorityItem: this.handleSetPriorityItem.bind(this),
      onDeleteItem: this.handleDeleteItem.bind(this),
    });

    this.todoFilter = new TodoFilter({
      onFilterItem: this.handleFilterItem.bind(this),
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

    this.render(this.todoData);
  }

  handleCreateItem = async (contents) => {
    await todoApi.create(this.teamId, this.userId, contents);
    this.getTodoData();
  };

  handleCheckItem = async (itemId) => {
    await todoApi.toggle(this.teamId, this.userId, itemId);
    this.getTodoData();
  };

  handleEditItem = async (itemId, contents) => {
    await todoApi.modify(this.teamId, this.userId, itemId, contents);
    this.getTodoData();
  };

  handleSetPriorityItem = async (itemId, priority) => {
    await todoApi.setPriority(this.teamId, this.userId, itemId, priority);
    this.getTodoData();
  };

  handleDeleteItem = async (itemId) => {
    await todoApi.delete(this.teamId, this.userId, itemId);
    this.getTodoData();
  };

  handleFilterItem(filter) {
    this.filter = filter;
    this.setItem();
  }

  render(todoData) {
    this.todoCount.innerHTML = todoData ? todoData.length : "0";
    this.todoList.setState(todoData);
  }
}
