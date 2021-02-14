import { memberAPI } from "../api/api.js";
import Component from "../core/Component.js";
export default class TodoList extends Component {
  template() {
    const { filteredList } = this.props;
    return `
    ${filteredList.map(
      (todo) => `
    <li class="todo-list-item ${
      todo.isCompleted ? "completed" : todo.edit ? "editing" : ""
    }" id="${todo._id}">
      <div class="view">
        <input class="toggle" type="checkbox" ${
          todo.isCompleted ? "checked" : ""
        }/>
        <label class="label">
          <div class="chip-container">
            ${
              todo.priority === "NONE"
                ? ""
                : todo.priority === "FIRST"
                ? `<span class="chip primary">1순위</span>`
                : `<span class="chip secondary">2순위</span>`
            }
            <select class="chip select ${
              todo.priority !== "NONE" ? "hidden" : ""
            }">
              <option value="0" selected>순위</option>
              <option value="1">1순위</option>
              <option value="2">2순위</option>
            </select>
          </div>
          ${todo.contents}
        </label>
        <button class="destroy"></button>
        </div>
        <input class="edit" value="${todo.contents}" />
    </li>
  `
    )}
    `;
  }

  setEvent() {
    const {
      toggleTodo,
      deleteTodo,
      onEditingMode,
      editTodo,
      revisePriority,
    } = this.props;
    const prioritySet = {
      0: "NONE",
      1: "FIRST",
      2: "SECOND",
    };
    this.addEvent("click", ".toggle", ({ target }) => {
      const itemID = this.getItemID(target, ".todo-list-item");
      toggleTodo(itemID);
    });
    this.addEvent("click", ".destroy", ({ target }) => {
      const itemID = this.getItemID(target, ".todo-list-item");
      deleteTodo(itemID);
    });
    this.addEvent("dblclick", ".label", ({ target }) => {
      const itemID = this.getItemID(target, ".todo-list-item");
      onEditingMode(itemID);
    });
    this.addEvent("keyup", ".edit", ({ key, target }) => {
      if (key !== "Enter" && key !== "Escape") return;
      const itemID = this.getItemID(target, ".todo-list-item");
      if (key === "Enter") {
        editTodo(itemID, target.value);
      }
      onEditingMode(itemID);
    });
    this.addEvent("click", ".todo-list-item", ({ target }) => {
      const targetClassList = target.classList;
      if (targetClassList.contains("chip") && target.tagName === "SPAN") {
        const $chipSelect = target
          .closest(".chip-container")
          .querySelector("select");
        target.classList.add("hidden");
        $chipSelect.classList.remove("hidden");
        const itemID = this.getItemID(target, ".todo-list-item");
        revisePriority(itemID, "NONE");
      }
    });
    this.addEvent("change", ".select", ({ target }) => {
      const itemID = this.getItemID(target, ".todo-list-item");
      const priority = prioritySet[target.value];
      revisePriority(itemID, priority);
    });
  }
  getItemID(target, className) {
    return target.closest(className).id;
  }
}
