import { todoAppTemplate, todoFilterTemplate, todoTemplate } from "@js/template";
import { getEl, pipe } from "@js/util";
import { getUsers } from "@lib/api";
import { FILTER_TYPE } from "@constants/constant";

import TodoInput from "./TodoInput";
import TodoItemList from "./TodoItemList";
import TodoFilters from "./TodoFilters";

class TodoApp {
  constructor({ _id, name, todoList, teamId, container, store }) {
    this.todoId = _id;
    this.name = name;
    this.todoList = todoList;
    this.teamId = teamId;
    this.container = container;
    this.store = store;
    this.todoListEl = null;
    this.todoCountEl = null;
    this.init();
  }

  init() {
    this.container.innerHTML += todoAppTemplate(this.todoId, this.name, this.todoList.length);

    Promise.resolve()
      .then(() => {
        this.todoListEl = getEl(`li[data-_id="${this.todoId}"] ul.todo-list`);
        this.todoCountEl = getEl(`li[data-_id="${this.todoId}"] .todo-count strong`);
      }).then(() => {
        this.store.on(["todoList", "filter"], this.updateTodoListViewPipe.bind(this));
        this.store.set({
          todoList: [...this.todoList],
          filter: FILTER_TYPE.ALL,
        });
      }).then(() => {
        new TodoInput({ todoId: this.todoId, teamId: this.teamId, store: this.store });
        // new TodoItemList(this.store);
        new TodoFilters({ todoId: this.todoId, store: this.store });
      });
  }

  updateTodoListViewPipe() {
    pipe(
      this._getTodoListData.bind(this),
      this._renderTodoList.bind(this)
    )();
  }

  _getTodoListData() {
    const { todoList, filter } = this.store.get();

    let onFilteringTodoList = todoList;
    if (filter === FILTER_TYPE.ACTIVE) onFilteringTodoList = todoList.filter((item) => !item.isCompleted);
    if (filter === FILTER_TYPE.COMPLETED) onFilteringTodoList = todoList.filter((item) => item.isCompleted);

    return { onFilteringTodoList };
  }

  _renderTodoList({ onFilteringTodoList }) {
    const todoListTemplate = onFilteringTodoList.map((todoItem) => todoTemplate(todoItem)).join("");

    this.todoListEl.innerHTML = todoListTemplate;
    this.todoCountEl.innerText = onFilteringTodoList.length;
  }
}

export default TodoApp;
