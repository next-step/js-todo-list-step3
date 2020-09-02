import {
  COUNT_CONTAINER,
  DELETE_ALL,
  ALL,
  ACTIVE,
  COMPLETED,
  PRIORITY,
} from "../../utils/data.js";

export default function TodoBottom({
  $target,
  todoCount,
  filterTodo,
  deleteAllTodos,
}) {
  this.init = () => {
    this.state = {
      todoCount,
      type: location.hash.split("#")[1],
    };
    this.filterTodo = filterTodo;
    this.deleteAllTodos = deleteAllTodos;
    this.$todoBottom = document.createElement("div");
    this.$todoBottom.classList.add(COUNT_CONTAINER);
    this.render();
    this.bindEventListener();

    $target.appendChild(this.$todoBottom);
  };

  this.render = () => {
    this.$todoBottom.innerHTML = `
      <span class="todo-count">총 <strong>${
        this.state.todoCount
      }</strong> 개</span>
      <ul class="filters">
        <li>
          <a href="#all" class="${
            this.state.type === ALL || this.state.type === "/" ? "selected" : ""
          }">전체보기</a>
        </li>
        <li>
          <a href="#priority" class="${
            this.state.type === PRIORITY ? "selected" : ""
          }">우선 순위</a>
        </li>
        <li>
          <a href="#active" class="${
            this.state.type === ACTIVE ? "selected" : ""
          }">해야할 일</a>
        </li>
        <li>
          <a href="#completed" class="${
            this.state.type === COMPLETED ? "selected" : ""
          }">완료한 일</a>
        </li>
      </ul>
      <button class="clear-completed">모두 삭제</button>
    `;
  };

  this.bindEventListener = () => {
    this.$todoBottom.addEventListener("click", this.clickHandler);
  };

  this.clickHandler = (evt) => {
    if (
      evt.target.tagName === "BUTTON" &&
      evt.target.className === DELETE_ALL
    ) {
      this.deleteAllTodos();
    } else if (evt.target.tagName === "A") {
      this.state.type = evt.target.hash.split("#")[1];
      this.filterTodo(this.state.type);
    }
  };

  this.setState = (todoCount) => {
    this.state.todoCount = todoCount;
    this.render();
  };

  this.init();
}
