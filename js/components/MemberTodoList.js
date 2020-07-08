import { memberTodoCountContainer, memberHeader, memberTodoInput } from '../utils/template.js';
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoCount from './TodoCount.js';
import api from '../utils/api.js';

// Each member info
export default class MemberTodoList {
  constructor({ $element, teamId, name, todoList, _id, onDragEnd }) {
    this.$element = $element;
    this.teamId = teamId;
    this.memberId = _id;
    this.name = name;
    this.todoList = todoList;
    this.onDragEnd = onDragEnd;

    this.initTodoListTemplate();
  }

  initTodoListTemplate() {
    this.$element.innerHTML = memberHeader(this.name);

    const $todoListContainer = document.createElement('div');
    $todoListContainer.className = 'todoapp';

    // 할 일 입력 input container
    const $todoInputContainer = document.createElement('section');
    $todoInputContainer.className = 'input-container';
    $todoInputContainer.innerHTML = memberTodoInput;

    // 할 일 목록 main section
    const $todoListMainContainer = document.createElement('section');
    $todoListMainContainer.className = 'main';
    const $todoListUl = document.createElement('ul');
    $todoListUl.className = `todo-list member-${this.memberId}`;
    $todoListMainContainer.append($todoListUl);

    // 할 일 카운트 container
    const $todoCountContainer = document.createElement('div');
    $todoCountContainer.className = 'count-container';
    // $todoCountContainer.innerHTML = memberTodoCountContainer;

    $todoListContainer.append($todoInputContainer);
    $todoListContainer.append($todoListMainContainer);
    $todoListContainer.append($todoCountContainer);
    this.$element.append($todoListContainer);

    new TodoInput({
      $element: this.$element.querySelector('.new-todo'),
      memberInfo: {
        teamId: this.teamId,
        memberId: this.memberId
      },
      onEnter: async () => {
        const { todoList } = await api.fetchMemberTodoList(this.teamId, this.memberId);
        this.setState(todoList);
      }
    });

    this.todoListComponent = new TodoList({
      $element: this.$element.querySelector('.todo-list'),
      list: this.todoList,
      memberInfo: {
        teamId: this.teamId,
        memberId: this.memberId
      },
      onToggleItem: async () => {
        const { todoList } = await api.fetchMemberTodoList(this.teamId, this.memberId);
        this.setState(todoList);
      },
      onDeleteItem: async () => {
        const { todoList } = await api.fetchMemberTodoList(this.teamId, this.memberId);
        this.setState(todoList);
      },
      onEditItem: async () => {
        const { todoList } = await api.fetchMemberTodoList(this.teamId, this.memberId);
        this.setState(todoList);
      },
      onDragEnd: isDragEnd => {
        this.onDragEnd(isDragEnd);
      }
    });

    this.todoCountComponent = new TodoCount({
      $countContainer: this.$element.querySelector('.count-container'),
      totalCount: this.todoList.length
    });
  }

  setState(newTodoList) {
    this.todoList = newTodoList || [];
    this.todoListComponent.setState(this.todoList);
    this.todoCountComponent.setState(this.todoList.length);
  }
}
