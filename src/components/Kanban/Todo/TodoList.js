import { CLASS_SELECTOR, KEY } from "../../../utils/constants.js";
import { loadingBar, todoItem } from "../../../utils/templates.js";
import {
  checkMoreThanOneClassContain,
  isArray,
  isBoolean,
} from "../../../utils/validator.js";

export default function TodoList($todoapp, todoDataService) {
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
    this.$main = document.createElement("section");
    this.$main.classList.add(CLASS_SELECTOR.MAIN);

    this.$todoList = document.createElement("ul");
    this.$todoList.classList.add(CLASS_SELECTOR.TODO_LIST);

    this.$main.appendChild(this.$todoList);
    $todoapp.appendChild(this.$main);
  };

  const bindEvent = () => {
    const onClick = async ({ target: $target }) => {
      const $li = $target.closest(`.${CLASS_SELECTOR.TODO_LIST_ITEM}`);

      if (checkMoreThanOneClassContain($target, CLASS_SELECTOR.DESTROY)) {
        todoDataService.deleteTodo($li.dataset.todoId);
        return;
      }

      if (checkMoreThanOneClassContain($target, CLASS_SELECTOR.TOGGLE)) {
        $target.disabled = true;
        await todoDataService.toggleTodo($li.dataset.todoId);
        $target.disabled = false;
        return;
      }

      if (checkMoreThanOneClassContain($target, CLASS_SELECTOR.CHIP)) {
        const $chipSelect = $target
          .closest(`.${CLASS_SELECTOR.CHIP_CONTAINER}`)
          .querySelector(`.${CLASS_SELECTOR.SELECT}`);
        $target.classList.add(CLASS_SELECTOR.HIDDEN);
        $chipSelect.classList.remove(CLASS_SELECTOR.HIDDEN);
      }
    };

    const onDblclickTodo = async ({ target: $target }) => {
      const $li = $target.closest(`.${CLASS_SELECTOR.TODO_LIST_ITEM}`);

      const liEditFocus = ($edit) => {
        const textLength = $edit.value.length;

        if (!checkMoreThanOneClassContain($target, CLASS_SELECTOR.EDIT)) {
          $edit.focus();
          $edit.setSelectionRange(textLength, textLength);
        }
      };

      if (
        !checkMoreThanOneClassContain($li, CLASS_SELECTOR.EDITING) &&
        checkMoreThanOneClassContain(
          $target,
          CLASS_SELECTOR.LABEL,
          CLASS_SELECTOR.CONTENTS
        )
      ) {
        this.$todoList
          .querySelectorAll(`.${CLASS_SELECTOR.EDITING}`)
          .forEach(($edit) => {
            $edit.classList.remove(CLASS_SELECTOR.EDITING);
          });

        $li.classList.add(CLASS_SELECTOR.EDITING);
        liEditFocus($li.querySelector(`.${CLASS_SELECTOR.EDIT}`));
      }
    };

    const onKeydownTodo = ({ target: $target, key }) => {
      const $li = $target.closest(`.${CLASS_SELECTOR.TODO_LIST_ITEM}`);

      const onEditKeydown = () => {
        if ($target.value && key === KEY.ENTER) {
          todoDataService.editTodo($li.dataset.todoId, $target.value);
          return;
        }

        if (event.key === KEY.ESCAPE) {
          $li.classList.remove(CLASS_SELECTOR.EDITING);
          $target.value = $li.querySelector(
            `.${CLASS_SELECTOR.CONTENTS}`
          ).textContent;
        }
      };

      if (checkMoreThanOneClassContain($target, CLASS_SELECTOR.EDIT)) {
        onEditKeydown();
      }
    };

    const onSelectPriorityChange = ({ target: $target }) => {
      const $li = $target.closest(`.${CLASS_SELECTOR.TODO_LIST_ITEM}`);

      if (checkMoreThanOneClassContain($target, CLASS_SELECTOR.SELECT)) {
        todoDataService.changePriorityTodo($li.dataset.todoId, $target.value);
      }
    };

    this.$todoList.addEventListener("click", onClick);
    this.$todoList.addEventListener("dblclick", onDblclickTodo);
    this.$todoList.addEventListener("keydown", onKeydownTodo);
    this.$todoList.addEventListener("change", onSelectPriorityChange);
  };

  this.render = () => {
    if (this.state.loading) {
      this.$todoList.innerHTML = loadingBar();
      return;
    }

    this.$todoList.innerHTML = this.state.todos
      .map((todo) => todo && todoItem(todo))
      .join("");
  };

  const init = () => {
    initElements();
    bindEvent();
    todoDataService.subscribe(this.setState);
    todoDataService.loadTodo();
  };

  init();
}
