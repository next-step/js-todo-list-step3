class TodoList {
  constructor({ memberIndex }) {
    this.memberIndex = memberIndex;
  }

  render = (items) => {
    if (!items) return (items = []);

    const template = items
      .map((item) => {
        return `<li  class="todo-list-item ${item.isCompleted ? "completed" : ""} 
        ${item.editing ? "editing" : ""}" >
        <div class="view">
          <input class="toggle" data-memberindex = ${this.memberIndex} data-itemid = ${
          item.id
        } type="checkbox" ${item.isCompleted ? "checked" : ""}/>
          <label class="label"  data-memberindex = ${this.memberIndex} data-itemid = ${item.id}>
          <div class="chip-container">
          ${
            item.priority === "NONE"
              ? `
              <select class="chip select" data-memberindex = ${this.memberIndex} data-itemid = ${item.id}>
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
