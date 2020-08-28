import { CLASS_SELECTOR, KEY } from "../../../utils/constants.js";

export default function TodoInput($todoapp, todoDataService) {
  const initElements = () => {
    this.$inputContainer = document.createElement("section");
    this.$inputContainer.classList.add(CLASS_SELECTOR.INPUT_CONTAINER);

    this.$todoInput = document.createElement("input");
    this.$todoInput.classList.add(CLASS_SELECTOR.NEW_TODO);
    this.$todoInput.placeholder = "할 일을 입력해주세요.";
    this.$todoInput.autofocus = true;
    this.$inputContainer.appendChild(this.$todoInput);
  };

  const bindEvent = () => {
    const onKeydownInput = ({ target: $target, key }) => {
      if ($target.value.trim() && key === KEY.ENTER) {
        todoDataService.addTodo($target.value);
        $target.value = "";
      }
    };

    this.$todoInput.addEventListener("keydown", onKeydownInput);
  };

  this.render = () => {
    $todoapp.appendChild(this.$todoInput);
  };

  const init = () => {
    initElements();
    bindEvent();
    this.render();
  };

  init();
}
