import {
  isBoolean,
  validateInstance,
  validateTodoItems,
} from "../../Common/utils.js";
import Title from "./Title.js";
import TodoInput from "./TodoInput.js";
import todoAPI from "../../Common/api/todoAPI.js";
import Loader from "../../Common/Components/Loader.js";

function TodoApp($target, { teamId, member }) {
  validateInstance(TodoApp, this);
  this.$target = $target;
  this.state = {
    memberName: member.name,
    todoItems: member.todoList,
    isLoading: false,
  };

  const api = new todoAPI(teamId, member._id);

  console.log(this.state);

  this.setState = (state) => {
    if (state?.todoItems) {
      validateTodoItems(state.todoItems);
      this.state.todoItems;
    }

    if (isBoolean(state?.isLoading)) {
      this.state.isLoading = state.isLoading;
    }

    this.render();

    if (this.state.isLoading) {
      return;
    }
    this.initComponents();
  };

  this.addTodoItem = async (contents) => {
    try {
      this.setState({ isLoading: true });
      const res = await api.addTodoItem(contents);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  this.initComponents = () => {
    this.userTitle = new Title(
      this.$target.querySelector(".user-title"),
      this.state.memberName
    );
    this.todoInput = new TodoInput(this.$target.querySelector(".todo-input"), {
      addTodoItem: (contents) => this.addTodoItem(contents),
    });
  };

  this.initEventListeners = () => {};

  this.render = () => {
    this.$target.innerHTML = this.state.isLoading
      ? Loader
      : `
      <h2 class="user-title"></h2>

      <section class="input-container todo-input">
      </section>

      <section class="main">
        <div id="todo-list"></div>
      </section>

      <div class="count-container">
        <div id="todo-count"></div>
        <div id="todo-filter"></div>
        <button class="clear-completed">모두 삭제</button>
      </div>
    `;
  };

  this.initEventListeners();
  this.render();
  this.initComponents();
}

export default TodoApp;
