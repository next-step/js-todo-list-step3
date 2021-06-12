import { $$ } from "../lib/util.js";

class TodoItems {
  constructor() {}

  render = (items) => {
    if (!items) return (items = []);
    const template = items
      .map((item) => {
        return `<li class="todo-list-item ${item.isCompleted ? "completed" : ""} 
        ${item.editing ? "editing" : ""}">
        <div class="view">
          <input class="toggle" type="checkbox" ${item.isCompleted ? "checked" : ""}/>
          <label class="label">
          <div class="chip-container">
          ${
            item.priority === "NONE"
              ? `
              <select class="chip select">
                <option value="0" selected>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
              </select>
            `
              : ` <span class="chip ${item.priority === "FIRST" ? "primary" : "secondary"}">${
                  item.priority === "FIRST" ? 1 : 2
                }순위</span>`
          }</div>
            ${item.contents}
          </label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="완료된 타이틀" />
      </li>`;
      })
      .join("");

    return `   <ul class="todo-list">
    ${template}
  </ul>`;
  };

  // registerEventHandler = () => {
  //   $$(".destroy").forEach((button) => {
  //     button.addEventListener("click", (e) => this.onDelete(e.target.dataset.id));
  //   });

  //   $$(".toggle").forEach((button) => {
  //     button.addEventListener("click", (e) => this.onComplete(e.target.dataset.id));
  //   });

  //   $$(".label").forEach((title) => {
  //     title.addEventListener("dblclick", (e) => this.onEditing(e.target.dataset.id));
  //   });

  //   $$(".edit").forEach((input) => {
  //     input.addEventListener("keydown", (e) => this.onEdit(e, e.target.dataset.id));
  //   });

  //   $$(".select").forEach((select) => {
  //     select.addEventListener("click", (e) => {
  //       this.onSetPriority(e, e.target.dataset.id);
  //     });
  //   });
  // };
}

export default TodoItems;
