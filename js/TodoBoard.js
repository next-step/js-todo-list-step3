import TodoHeader from './Header.js';
import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import TodoFilter from './components/TodoFilter.js';

import {
  toggleTodo,
  addTodoItem,
  updateTodoItem,
  updateTodoPriority,
  deleteTodoItem,
} from '../api/todo.js';

export default class TodoBoard {
  constructor($todoContainer, member) {
    this.$todoContainer = $todoContainer;
    this.memberInfo = member;
    this.todos = member.todoList;
    this.filterdTodos = [];

    this.$todoAppListContainer = document.querySelector(
      '.todoapp-list-container'
    );
    this.render();

    this.todoHeader = new TodoHeader(member._id);
    this.todoInput = new TodoInput(member._id, this.addTodo.bind(this));
    this.todoList = new TodoList(
      member._id,
      this.toggleTodo.bind(this),
      this.editTodo.bind(this),
      this.changePriority.bind(this),
      this.removeTodo.bind(this)
    );
    this.todoFilter = new TodoFilter(
      member._id,
      this.allRemoveTodo.bind(this),
      this.updateFilteredTodoList.bind(this)
    );

    this.init();
  }

  init() {
    this.todoHeader.setState(this.memberInfo.name);
    this.updateFilteredTodoList();
  }

  getFiteredTodoList() {
    return this.memberInfo.todoList.filter((todo) => {
      if (location.hash === '#/active') {
        return !todo.isCompleted;
      }
      if (location.hash === '#/completed') {
        return todo.isCompleted;
      }
      return true;
    });
  }

  updateFilteredTodoList() {
    this.filterdTodos = this.getFiteredTodoList();
    this.todoList.setTodoList(this.filterdTodos);
    this.todoFilter.setState(this.filterdTodos.length);
  }

  setTodoState(todoList = []) {
    try {
      this.todos = {
        ...this.todos,
        todoList,
      };
      this.updateFilteredTodoList();
    } catch (error) {
      alert(`setTodoState error: ${error.message}`);
    }
  }

  async addTodo(contents) {
    try {
      const newTodoItem = await addTodoItem(this.selectedUserName, contents);
      const todoList = this.memberInfo.todoList || [];
      this.setTodoState(todoList.concat(newTodoItem));
    } catch (error) {
      alert(`addTodo error: ${error.message}`);
    }
  }

  async toggleTodo(targetId) {
    try {
      const updatedTodo = await toggleTodo(this.selectedUserName, targetId);
      const targetTodo = this.memberInfo.todoList.find(
        (todo) => todo._id === updatedTodo._id
      );
      const newValue = !targetTodo.isCompleted;
      const newTodos = this.makeNewTodoList('isCompleted', targetId, newValue);
      this.setTodoState(newTodos);
    } catch (error) {
      alert(`toggleTodo error: ${error.message}`);
    }
  }

  async editTodo(itemId, contents) {
    try {
      const updatedTodo = await updateTodoItem(
        this.selectedUserName,
        itemId,
        contents
      );
      const targetId = updatedTodo._id;
      const newTodos = this.makeNewTodoList('contents', targetId, contents);
      this.setTodoState(newTodos);
    } catch (error) {
      alert(`editTodo error: ${error.message}`);
    }
  }

  async changePriority(itemId, priority) {
    try {
      const updatedTodo = await updateTodoPriority(
        this.selectedUserName,
        itemId,
        priority
      );
      const targetId = updatedTodo._id;
      const newTodos = this.makeNewTodoList('priority', targetId, priority);
      this.setTodoState(newTodos);
    } catch (error) {
      alert(`changePriority error: ${error.message}`);
    }
  }

  removeTodo(targetId) {
    try {
      deleteTodoItem(this.selectedUserName, targetId);
      this.setTodoState([]);
    } catch (error) {
      alert(`removeTodo error: ${error.message}`);
    }
  }

  allRemoveTodo() {
    try {
      console.log(this.todos);
      if (this.memberInfo.todoList.length === 0) {
        throw new Error('삭제할 todo가 없습니다.');
      }
      if (confirm('정말로 전부 삭제하시겠습니까?')) {
        this.memberInfo.todoList.forEach((todo) => {
          deleteTodoItem(this.selectedUserName, todo._id);
        });
        this.setTodoState([]);
      }
    } catch (error) {
      alert(`allRemoveTodo error: ${error.message}`);
    }
  }

  render() {
    this.$todoContainer.innerHTML = `
      <h2 class="user-title"></h2>

      <div class="todoapp">
        <section class="input-container"></section>

        <section class="main">
          <ul class="todo-list"></ul>
        </section>

        <div class="count-container">
          <ul class="filters">
            <li>
              <a href="#all" class="selected">전체보기</a>
            </li>
            <li>
              <a href="#priority">우선 순위</a>
            </li>
            <li>
              <a href="#active">해야할 일</a>
            </li>
            <li>
              <a href="#completed">완료한 일</a>
            </li>
          </ul>
          <button class="clear-completed">모두 삭제</button>
        </div>
      </div>
    `;
    this.$todoAppListContainer.appendChild(this.$todoContainer);
  }
}
