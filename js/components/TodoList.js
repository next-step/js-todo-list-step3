import Component from "../core/Component.js";
export default class TodoList extends Component {
  template() {
    const { filteredList } = this.props;
    console.log(filteredList);
    return `
    ${filteredList.map(
      (todo) => `
    <li class="todo-list-item" id="${todo._id}">
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
    const { toggleTodo, deleteTodo, onEditingMode, editTodo } = this.props;

    this.addEvent("click", ".toggle", ({ target }) => {
      const seq = Number(target.closest("[data-seq]").dataset.seq);
      toggleTodo(seq);
    });
    this.addEvent("click", ".destroy", ({ target }) => {
      const itemID = target.closest(".todo-list-item").id;
      deleteTodo(itemID);
    });
    this.addEvent("dblclick", ".label", ({ target }) => {
      const seq = Number(target.closest("[data-seq]").dataset.seq);
      onEditingMode(seq);
    });
    this.addEvent("keyup", ".edit", ({ key, target }) => {
      if (key === "Enter") {
        const seq = Number(target.closest("[data-seq]").dataset.seq);
        editTodo(seq, target.value);
      } else if (key === "Escape") {
        const seq = Number(target.closest("[data-seq]").dataset.seq);
        onEditingMode(seq);
      } else {
        return;
      }
    });
  }
}
