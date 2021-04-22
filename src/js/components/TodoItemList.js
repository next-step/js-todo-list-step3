import { getEl, containsClass } from "@js/util";
import * as api from "@lib/api";
import { UI_CLASS, KEY, MESSAGES } from "@constants/constant";

class TodoItemList {
  constructor({ memberId, teamId, store, container }) {
    this.memberId = memberId;
    this.teamId = teamId;
    this.store = store;
    this.todoListEl = getEl("ul.todo-list", container);
    this.todoAllDeleteButton = getEl("button.clear-completed", container);
    this.todoPrioritySelect = getEl("select.chip.select", container);
    this.init();
  }

  init() {
    this.todoListEl.addEventListener("click", this.clickDelegationHandler.bind(this));
    this.todoListEl.addEventListener("dblclick", this.modifyHandler.bind(this));
    this.todoListEl.addEventListener("keyup", this.modifyConfirmHandler.bind(this));
    this.todoListEl.addEventListener("change", this.changePriorityHandler.bind(this));
    this.todoAllDeleteButton.addEventListener("click", this.allDeleteTodoItem.bind(this));
  }

  async _setTodoList() {
    const {
      data: { todoList },
    } = await api.getTodoItems({ teamId: this.teamId, memberId: this.memberId });
    const _todoList = todoList ? todoList : [];

    this.store.set({
      todoList: [..._todoList],
    });
  }

  clickDelegationHandler({ target }) {
    if (containsClass(target, UI_CLASS.TOGGLE)) return this._toggleTodoItem(target);
    if (containsClass(target, UI_CLASS.DESTROY)) return this._delteTodoItem(target);
  }

  async _toggleTodoItem({ dataset: { _id: itemId } }) {
    await api.toggleTodoItem({ teamId: this.teamId, memberId: this.memberId, itemId });
    this._setTodoList();
  }

  async _delteTodoItem({ dataset: { _id: itemId } }) {
    if (!confirm(MESSAGES.DELETE_TODO)) return;
    await api.deleteTodoItem({ teamId: this.teamId, memberId: this.memberId, itemId });
    this._setTodoList();
  }

  async allDeleteTodoItem() {
    if (!confirm(MESSAGES.DELETE_TODO)) return;

    const {
      selectedUser: { _id: userId },
    } = this.store.get();
    // await api.allDeleteTodoItem({ userId });
    this._setSelectedUser(userId);
  }

  modifyHandler({ target }) {
    if (!target.classList.contains(UI_CLASS.LABEL)) return;
    const { _id: itemId } = target.closest(`.${UI_CLASS.TODO_ITEM}`).dataset;
    getEl(`li[data-_id="${itemId}"]`, this.todoListEl).classList.add(UI_CLASS.EDITING);
  }

  async modifyConfirmHandler({ key, target }) {
    if (key === KEY.ENTER || key === KEY.ESCAPE) {
      const { _id: itemId } = target.closest(`.${UI_CLASS.TODO_ITEM}`).dataset;
      if (key === KEY.ESCAPE) return getEl(`li[data-_id="${itemId}"]`).classList.remove(UI_CLASS.EDITING);
      await api.modifyTodoItem({ teamId: this.teamId, memberId: this.memberId, itemId, contents: target.value });
      this._setTodoList();
    }
  }

  async changePriorityHandler({ target }) {
    if (!target.classList.contains(UI_CLASS.SELECT)) return;

    const {
      selectedUser: { _id: userId },
    } = this.store.get();
    const { _id: todoId } = target.closest(`.${UI_CLASS.TODO_ITEM}`).dataset;
    // await api.priorityTodoItem({ userId, todoId, priority: target.value });
    this._setSelectedUser(userId);
  }
}

export default TodoItemList;
