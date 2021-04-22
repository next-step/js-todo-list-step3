import { todoTemplate } from "@js/template";
import { getEl, pipe, getPriorityTodoList } from "@js/util";
import { FILTER_TYPE } from "@constants/constant";

import TodoInput from "./TodoInput";
import TodoItemList from "./TodoItemList";
import TodoFilters from "./TodoFilters";

class TodoApp {
  constructor({ _id, name, todoList, teamId, store }) {
    this.teamId = teamId;
    this.memberId = _id;
    this.name = name;
    this.todoList = todoList;
    this.store = store;
    this.memberEl = null;
    this.todoListEl = null;
    this.todoCountEl = null;
    this.init();
  }

  init() {
    Promise.resolve()
      .then(() => {
        this.memberEl = getEl(`li[data-_id="${this.memberId}`);
        this.todoListEl = getEl("ul.todo-list", this.memberEl);
        this.todoCountEl = getEl(".todo-count strong", this.memberEl);
      })
      .then(() => {
        this.store.on(["todoList", "filter"], this.render.bind(this));
        this.store.set({
          todoList: [...this.todoList],
          filter: FILTER_TYPE.ALL,
        });

        new TodoInput({ memberId: this.memberId, teamId: this.teamId, store: this.store });
        new TodoItemList({ memberId: this.memberId, teamId: this.teamId, store: this.store, container: this.memberEl });
        new TodoFilters({ memberId: this.memberId, store: this.store });
      });
  }

  _getTodoListData() {
    const { todoList, filter } = this.store.get();

    let onFilteringTodoList = todoList;
    if (filter === FILTER_TYPE.ACTIVE) onFilteringTodoList = todoList.filter((item) => !item.isCompleted);
    if (filter === FILTER_TYPE.COMPLETED) onFilteringTodoList = todoList.filter((item) => item.isCompleted);
    if (filter === FILTER_TYPE.PRIORITY) onFilteringTodoList = getPriorityTodoList(todoList);

    return { onFilteringTodoList };
  }

  _renderTodoList({ onFilteringTodoList }) {
    const todoListTemplate = onFilteringTodoList.map((todoItem) => todoTemplate(todoItem)).join("");

    this.todoListEl.innerHTML = todoListTemplate;
    this.todoCountEl.innerText = onFilteringTodoList.length;
  }

  render() {
    pipe(this._getTodoListData.bind(this), this._renderTodoList.bind(this))();
  }
}

export default TodoApp;
