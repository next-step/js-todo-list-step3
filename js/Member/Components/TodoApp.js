import { validateInstance } from "../../Common/utils.js";
import Title from "./Title.js";

function TodoApp($target, member) {
  validateInstance(TodoApp, this);
  this.$target = $target;
  this.state = {
    user: member.name,
    todoItems: member.todoList,
  };

  console.log(this.state);

  this.initComponents = () => {
    this.userTitle = new Title(
      this.$target.querySelector(".user-title"),
      this.state.user
    );
  };

  this.initEventListeners = () => {};

  this.render = () => {
    this.$target.innerHTML = `
      <h2 class="user-title"></h2>
    `;
  };

  this.initEventListeners();
  this.render();
  this.initComponents();
}

export default TodoApp;
