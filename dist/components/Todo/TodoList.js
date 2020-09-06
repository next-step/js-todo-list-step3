import { TOGGLE, EDIT, EDITING, ESC, ENTER, MAIN, EDIT_INPUT } from "../../utils/data.js";
import { errorCallTemplate, todoListTemplate } from "../../utils/template.js";
import { clearRemainingDblClickEvt } from "../../utils/util.js";

export default function TodoList({
  $target,
  todoList,
  deleteTodo,
  toggleTodo,
  editTodo,
  setPriority
}) {
  this.init = () => {
    if (!(this instanceof TodoList)) {
      throw new Error(errorCallTemplate);
    }
    this.state = {
      todoList: todoList
    };
    this.$todoList = document.createElement("section");
    this.$todoList.classList.add(MAIN);
    this.deleteTodo = deleteTodo;
    this.toggleTodo = toggleTodo;
    this.editTodo = editTodo;
    this.setPriority = setPriority;

    $target.appendChild(this.$todoList);
  };
  this.render = () => {
    this.$todoList.innerHTML = todoListTemplate(this.state.todoList);
  };
  this.setState = todoList => {
    this.state.todoList = todoList;
    this.render();
  };
  this.clickHandler = ({ target }) => {
    if (target.tagName === "INPUT" && target.classList.contains(TOGGLE)) {
      this.toggleTodo({ _id: target.closest("li").dataset.id });
    }
    if (target.tagName === "BUTTON" && target.className === "destroy") {
      this.deleteTodo({ _id: target.closest("li").dataset.id });
    }
  };
  this.dblClickHandler = ({ target }) => {
    clearRemainingDblClickEvt(target);
    if (target.tagName === "LABEL") {
      target.closest("li").classList.toggle(EDITING);
      const input = target.closest("li").querySelector(EDIT_INPUT);
      input.setSelectionRange(input.value.length, input.value.length);
      target.closest("li").querySelector(EDIT_INPUT).focus();
    }
  };
  this.keydownHandler = evt => {
    if (evt.target.tagName === "INPUT" && evt.target.classList.contains(EDIT) && evt.key === ESC) {
      evt.target.parentNode.classList.toggle(EDITING);
    } else if (evt.target.tagName === "INPUT" && evt.key === ENTER) {
      this.editTodo({
        contents: evt.target.value,
        _id: evt.target.parentNode.dataset.id
      });
    }
  };
  this.changeHandler = ({ target }) => {
    if (target.tagName === "SELECT") {
      const priority = parseInt(target.value);
      this.setPriority({ _id: target.closest("li").dataset.id, priority });
    }
  };
  this.bindEventListener = () => {
    this.$todoList.addEventListener("click", this.clickHandler);
    this.$todoList.addEventListener("dblclick", this.dblClickHandler);
    this.$todoList.addEventListener("keydown", this.keydownHandler);
    this.$todoList.addEventListener("keydown", this.enterHandler);
    this.$todoList.addEventListener("change", this.changeHandler);
  };
  this.init();
  this.render();
  this.bindEventListener();
}