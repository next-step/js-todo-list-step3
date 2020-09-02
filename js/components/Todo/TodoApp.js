import { TODO_APP } from "../../utils/data.js";
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import { errorCallTemplate } from "../../utils/template.js";
import TodoBottom from "./TodoBottom.js";

export default function TodoApp({ $target, todoList }) {
  this.init = () => {
    if (!(this instanceof TodoApp)) {
      throw new Error(errorCallTemplate);
    }
    this.$todoApp = document.createElement("div");
    this.$todoApp.classList.add(TODO_APP);

    this.todoInput = new TodoInput({
      $target: this.$todoApp,
    });
    this.todoList = new TodoList({
      $target: this.$todoApp,
      todoList,
    });
    this.todoBottom = new TodoBottom({
      $target: this.$todoApp,
      todoCount: todoList.length,
    });

    $target.appendChild(this.$todoApp);
  };

  this.init();
}
