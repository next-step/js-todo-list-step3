import { validateInstance } from "../../Common/utils.js";
import TodoApp from "./TodoApp.js";

function TodoAppList($target, members) {
  validateInstance(TodoAppList, this);
  this.$target = $target;
  this.state = {
    members,
  };
  console.log(this.state.members);

  this.initComponents = () => {
    this.todoApps = this.state.members.map((member) => {
      return new TodoApp(document.getElementById(member._id), member);
    });
    console.log(this.todoApps);
  };

  this.initEventListeners = () => {};

  this.render = () => {
    const membersHTML = this.state.members
      .map(({ _id }) => `<li class="todoapp-container" id="${_id}"></li>`)
      .join("");

    this.$target.innerHTML = `
      ${membersHTML}
      <li class="add-user-button-container">
        <button id="add-user-button" class="ripple">
          <span class="material-icons">add</span>
        </button>
      </li>
    `;
  };

  this.initEventListeners();
  this.render();
  this.initComponents();
}

export default TodoAppList;
