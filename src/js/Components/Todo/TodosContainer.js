import { todoListHTML, addUserButtonHTML } from '../../utils/templates/user.js';
import {
  MESSAGE,
  SELECTOR,
  CLASS_NAME,
  KEY,
  PRIORITY,
} from '../../utils/constants.js';

function TodosContainer({
  $target,
  state,
  onAddUser,
  onToggleTodo,
  onDeleteTodo,
  onAddTodo,
  onEditPriority,
}) {
  this.init = () => {
    this.$target = $target;
    const { teamId, members } = state;
    this.teamId = teamId;
    this.members = members;

    this.render();
    this.bindEvents();
  };

  this.bindEvents = () => {
    this.$target.addEventListener('click', this.onClick);
    this.$target.addEventListener('keydown', this.onKeyDown);
    this.$target.addEventListener('change', this.onChange);
  };

  this.onClick = (e) => {
    const $target = e.target;
    const $todoListContainer = $target.closest(SELECTOR.TODO_LIST_CONTAINER);
    const $addUserButton = $target.closest(SELECTOR.ADD_USER_BUTTON);

    if (!($todoListContainer || $addUserButton)) {
      return;
    }

    // 유저 추가
    if ($addUserButton) {
      const name = prompt(MESSAGE.INPUT_USER_NAME);

      if (!name || !name.trim().length) {
        alert(MESSAGE.NO_USER_NAME);
        return;
      }

      onAddUser(name);
      return;
    }

    // 투두 리스트 조작
    if (!$todoListContainer) {
      return;
    }

    const userId = $todoListContainer.id;
    const $todoItem = $target.closest(SELECTOR.TODO_ITEM);

    // todo item 토글
    if ($target.classList.contains(CLASS_NAME.TOGGLE)) {
      onToggleTodo(userId, $todoItem.id);
      return;
    }

    // todo item 삭제
    if ($target.classList.contains(CLASS_NAME.DESTROY)) {
      onDeleteTodo(userId, $todoItem.id);
      return;
    }

    // 우선 순위 재선택
    if (
      $target.classList.contains(CLASS_NAME.CHIP) &&
      !$target.classList.contains(CLASS_NAME.SELECT)
    ) {
      onEditPriority(userId, $todoItem.id, PRIORITY.NONE);
      return;
    }
  };

  this.onKeyDown = (e) => {
    const $target = e.target;
    const $todoInput = $target.closest(SELECTOR.TODO_INPUT);
    const key = e.key;

    if (!$todoInput) {
      return;
    }

    if (key !== KEY.ENTER && key !== KEY.ESC) {
      return;
    }

    const contents = $target.value.trim();
    const userId = $target.closest(SELECTOR.TODO_LIST_CONTAINER).id;

    switch (key) {
      case KEY.ENTER:
        if (!contents.length) {
          alert(MESSAGE.NO_INPUT_KEYWORD);
          return;
        }

        onAddTodo(userId, contents);
        return;

      case KEY.ESC:
        return;

      default:
        console.error(`${key} : ${MESSAGE.UNDEFINED_KEY}`);
        return;
    }
  };

  this.onChange = (e) => {
    const $target = e.target;
    const $todoInput = $target.closest(SELECTOR.TODO_INPUT);
    const $select = $target.closest(SELECTOR.CHIP_SELECT);

    if ($todoInput || !$select) {
      return;
    }

    if ($target.value === PRIORITY.NONE) {
      return;
    }

    const userId = $target.closest(SELECTOR.TODO_LIST_CONTAINER).id;
    const todoId = $target.closest(SELECTOR.TODO_ITEM).id;
    onEditPriority(userId, todoId, $target.value);
  };

  this.setState = (nextState) => {
    const { teamId, members } = nextState;

    this.teamId = teamId;
    this.members = members;

    this.render();
  };

  this.createTodoListHTML = (member) => todoListHTML(member, 'all');

  this.createContainerHTML = (members) => {
    return (
      members.reduce((html, member) => {
        html += this.createTodoListHTML(member);
        return html;
      }, '') + addUserButtonHTML()
    );
  };

  this.render = () => {
    this.$target.innerHTML = this.createContainerHTML(this.members);
  };

  this.init();
}

export default TodosContainer;
