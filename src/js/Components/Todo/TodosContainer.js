import { todoListHTML, addUserButtonHTML } from '../../utils/templates/user.js';
import {
  MESSAGE,
  SELECTOR,
  CLASS_NAME,
  KEY,
  PRIORITY,
} from '../../utils/constants.js';
import { getSelectedTabTodos } from '../../utils/util.js';

function TodosContainer({
  $target,
  members,
  onAddUser,
  onToggleTodo,
  onDeleteTodo,
  onAddTodo,
  onEditPriority,
  onEditTodo,
  onDeleteAllTodo,
}) {
  this.init = () => {
    this.$target = $target;
    this.members = members;

    this.isEditing = false;
    this.tabClassNames = [
      CLASS_NAME.ALL,
      CLASS_NAME.PRIORITY,
      CLASS_NAME.ACTIVE,
      CLASS_NAME.COMPLETED,
    ];

    this.render();
    this.bindEvents();
  };

  this.bindEvents = () => {
    this.$target.addEventListener('click', this.onClick);
    this.$target.addEventListener('keydown', this.onKeyDown);
    this.$target.addEventListener('change', this.onChange);
    this.$target.addEventListener('dblclick', this.onDblclick);
    this.$target.addEventListener('focusout', this.onFocusout);
  };

  this.onClick = (e) => {
    const $target = e.target;
    const $todoListContainer = $target.closest(SELECTOR.TODO_LIST_CONTAINER);
    const $addUserButton = $target.closest(SELECTOR.ADD_USER_BUTTON);
    const $todoTab = $target.closest(SELECTOR.TODO_TAB);
    const $todoClearAllButton = $target.closest(SELECTOR.TODO_CLEAR_ALL_BUTON);

    if (
      !$todoListContainer &&
      !$addUserButton &&
      !$todoTab &&
      !$todoClearAllButton
    ) {
      return;
    }

    // 유저 추가
    if ($addUserButton) {
      const name = prompt(MESSAGE.INPUT_USER_NAME);

      if (!name || !name.trim().length) {
        alert(MESSAGE.NO_USER_NAME);
        return;
      }

      try {
        onAddUser(name);
      } catch (err) {
        console.error(err);
      }
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
      try {
        onToggleTodo(userId, $todoItem.id);
      } catch (err) {
        console.error(err);
      }
      return;
    }

    // todo item 삭제
    if ($target.classList.contains(CLASS_NAME.DESTROY)) {
      try {
        onDeleteTodo(userId, $todoItem.id);
      } catch (err) {
        console.error(err);
      }
      return;
    }

    // 우선 순위 재선택
    if (
      $target.classList.contains(CLASS_NAME.CHIP) &&
      !$target.classList.contains(CLASS_NAME.SELECT)
    ) {
      try {
        onEditPriority(userId, $todoItem.id, PRIORITY.NONE);
      } catch (err) {
        console.error(err);
      }
      return;
    }

    // todoTab
    if ($target.classList.contains(CLASS_NAME.SELECTED)) {
      return;
    }

    if (this.tabClassNames.some((name) => $target.classList.contains(name))) {
      const members = this.members.map((member) => {
        return {
          ...member,
          selectedTab:
            member._id === userId
              ? $target.className.trim()
              : member.selectedTab,
        };
      });

      this.setState(members);
    }

    // deleteAll
    if ($todoClearAllButton) {
      try {
        onDeleteAllTodo(userId);
      } catch (err) {
        console.error(err);
      }
      return;
    }
  };

  this.onKeyDown = (e) => {
    const $target = e.target;
    const $todoInput = $target.closest(SELECTOR.TODO_INPUT);
    const $todoItem = $target.closest(SELECTOR.TODO_ITEM);
    const key = e.key;

    if (!$todoInput && !$todoItem) {
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

        if (this.isEditing) {
          const todoId = $target.closest(SELECTOR.TODO_ITEM).id;

          try {
            onEditTodo(userId, todoId, contents);
          } catch (err) {
            console.error(err);
          }

          this.isEditing = false;
          return;
        }

        try {
          onAddTodo(userId, contents);
        } catch (err) {
          console.error(err);
        }
        return;

      case KEY.ESC:
        if (!this.isEditing) {
          return;
        }

        $todoItem.classList.remove(CLASS_NAME.EDITING);
        this.isEditing = false;
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

    try {
      onEditPriority(userId, todoId, $target.value);
    } catch (err) {
      console.error(err);
    }
  };

  this.onDblclick = (e) => {
    if (this.isEditing) {
      return;
    }

    const $target = e.target;
    if (!$target.classList.contains(CLASS_NAME.LABEL)) {
      return;
    }

    this.isEditing = true;
    const $todoItem = $target.closest(SELECTOR.TODO_ITEM);
    $todoItem.classList.add(CLASS_NAME.EDITING);
    $todoItem.querySelector(SELECTOR.EDIT).select();
  };

  this.onFocusout = (e) => {
    if (!this.isEditing) {
      return;
    }

    const $todoItem = e.target.closest(SELECTOR.TODO_ITEM);
    $todoItem.classList.remove(CLASS_NAME.EDITING);
    this.isEditing = false;
  };

  this.setState = (nextState) => {
    this.members = nextState;

    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = this.createContainerHTML(this.members);
  };

  this.createContainerHTML = (members) => {
    return (
      members.reduce((html, member) => {
        const filteredMember = {
          ...member,
          todoList: getSelectedTabTodos(member.todoList, member.selectedTab),
        };

        html += this.createTodoListHTML(filteredMember);
        return html;
      }, '') + addUserButtonHTML()
    );
  };

  this.createTodoListHTML = (member) => todoListHTML(member);

  this.init();
}

export default TodosContainer;
