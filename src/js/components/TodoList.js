import { filter } from "../lib/renderingFilter.js";

class TodoList {
  constructor({ memberIndex, filterType }) {
    this.memberIndex = memberIndex;
    this.filterType = filterType;
  }

  render = (items) => {
    if (!items) return (items = []);

    const template = filter(items, this.filterType)
      .map((item) => {
        return `<li  class="todo-list-item ${item.isCompleted ? "completed" : ""} 
        ${item.editing ? "editing" : ""}" >
        <div class="view">
          <input class="toggle" data-memberindex = ${this.memberIndex} data-itemid = ${
          item.id
        } type="checkbox" ${item.isCompleted ? "checked" : ""}/>
          <label class="label"  data-memberindex = ${this.memberIndex} data-itemid = ${item.id} >
          <div class="chip-container">
          ${
            item.priority === 0
              ? `
              <select class="chip select" data-memberindex = ${this.memberIndex} data-itemid = ${item.id}>
                <option value="0" selected>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
              </select>
            `
              : ` <span class="chip ${item.priority === 1 ? "primary" : "secondary"}">${
                  item.priority
                }순위</span>`
          }</div>
            ${item.contents}
          </label>
          <button class="destroy" data-memberindex = ${this.memberIndex} data-itemid = ${
          item.id
        }></button>
        </div>
        <input class="edit" value="${item.contents}"  data-memberindex = ${
          this.memberIndex
        } data-itemid = ${item.id} />
      </li>`;
      })
      .join("");

    return `<ul class="todo-list">
    ${template}
  </ul>`;
  };
}

export default TodoList;
