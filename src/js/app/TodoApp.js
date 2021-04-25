import { TodoInput } from '../component/todo/TodoInput.js';
import { TodoList } from '../component/todo/TodoList.js';
import { TodoStatusContainer } from '../component/todo/TodoStatusContainer.js';
import { $$ } from '../util/domSelection.js';

export class TodoApp {
  constructor() {
    this.todoInput = new TodoInput();
    this.todoList = new TodoList();
    this.todoStatusContainer = new TodoStatusContainer();
  }

  renderAll({ memberId, todoList, filterState }) {
    const todoAppStructure = `<div class="todoapp">
      <section class="input-container">:TodoInput:</section>
      <section class="main">
        <ul class="todo-list">:TodoList:</ul>
      </section>
      <div class="count-container">:TodoStatusContainer:</div>
    </div>`;
    let $todoAppContainer = null;
    $$('li.todoapp-container').forEach((li) => {
      if (li.dataset.memberid == memberId) {
        $todoAppContainer = li;
        return;
      }
    });
    const [todoApp] = $$('div.todoapp', $todoAppContainer);
    if (!todoApp) {
      $todoAppContainer.insertAdjacentHTML('beforeend', todoAppStructure);
    }

    this.todoInput.render($todoAppContainer);
    if (filterState == TodoStatusContainer.FILTER_STATE.PRIORITY) {
      const sortTodoList = [...todoList];
      const comparator = (todoA, todoB) => {
        const priorityValue = {
          NONE: Number.MAX_SAFE_INTEGER,
          FIRST: 1,
          SECOND: 2,
        };
        const priorityA = priorityValue[todoA.priority];
        const priorityB = priorityValue[todoB.priority];
        return priorityA - priorityB;
      };
      sortTodoList.sort(comparator);
      this.todoList.render(sortTodoList, $todoAppContainer);
    } else {
      this.todoList.render(todoList, $todoAppContainer);
    }
    this.todoStatusContainer.render(filterState, $todoAppContainer);
  }
}
