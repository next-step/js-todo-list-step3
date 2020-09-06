import { ENTER, KEYDOWN, INPUT_CONTAINER } from "../../utils/data.js";
import { errorCallTemplate, todoInputTemplate } from "../../utils/template.js";

export default function TodoInput({ $target, addTodo }) {
  this.init = () => {
    if (!(this instanceof TodoInput)) {
      throw new Error(errorCallTemplate);
    }
    this.$todoInput = document.createElement("section");
    this.$todoInput.classList.add(INPUT_CONTAINER);
    this.addTodo = addTodo;

    this.render();
    $target.appendChild(this.$todoInput);
  };
  this.render = () => {
    this.$todoInput.innerHTML = todoInputTemplate;
  };
  this.enterHandler = evt => {
    if (evt.key === ENTER) {
      this.addTodo({
        contents: evt.target.value
      });
      evt.target.value = "";
      evt.target.focus();
    }
  };
  this.bindEventListener = () => {
    this.$todoInput.addEventListener(KEYDOWN, this.enterHandler);
  };
  this.init();
  this.bindEventListener();
}