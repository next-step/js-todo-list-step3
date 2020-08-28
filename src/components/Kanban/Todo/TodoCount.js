import { CLASS_SELECTOR } from "../../../utils/constants.js";
import {
  checkMoreThanOneClassContain,
  isArray,
  isBoolean,
} from "../../../utils/validator.js";
import { loadingBar, todoCount } from "../../../utils/templates.js";

export default function TodoCount($todoapp, todoDataService) {
  this.state = {
    todos: [],
    loading: true,
  };

  this.setState = ({ todos, loading }) => {
    if (isArray(todos)) {
      this.state.todos = todos;
    }

    if (isBoolean(loading)) {
      this.state.loading = loading;
    }
    this.render();
  };

  const initElements = () => {
    this.$countContainer = document.createElement("div");
    this.$countContainer.classList.add(CLASS_SELECTOR.COUNT_CONTAINER);
  };

  const bindEvent = () => {
    const onClick = ({ target: $target }) => {
      if (checkMoreThanOneClassContain($target, CLASS_SELECTOR.FILTER)) {
        const filter = $target.dataset.filter;
        todoDataService.setFilter(filter);
        return;
      }

      if (
        checkMoreThanOneClassContain($target, CLASS_SELECTOR.CLEAR_COMPLETED)
      ) {
        todoDataService.deleteAllTodo();
      }
    };

    this.$countContainer.addEventListener("click", onClick);
  };

  this.render = () => {
    if (this.state.loading) {
      this.$countContainer.innerHTML = loadingBar();
      return;
    }

    this.$countContainer.innerHTML = todoCount(
      this.state.todos.length,
      todoDataService.getFilter()
    );
    $todoapp.appendChild(this.$countContainer);
  };

  const init = () => {
    initElements();
    bindEvent();
    this.render();
    todoDataService.subscribe(this.setState);
  };

  init();
}
