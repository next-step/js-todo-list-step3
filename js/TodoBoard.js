import TodoHeader from './Header.js';
import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import TodoFilter from './components/TodoFilter.js';

import {
  getTodoItemsOfMember,
  toggleTodo,
  addTodoItem,
  updateTodoItem,
  updateTodoPriority,
  deleteTodoItem,
  allDeleteTodoItem,
} from '../api/todo.js';

export default class TodoBoard {
  constructor($todoContainer, member) {
    this.currentTeamId = location.search.split('=')[1];
    this.$todoContainer = $todoContainer;
    this.memberInfo = member;
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

  getFilteredTodoList() {
    if (location.hash === `#priority_${this.memberInfo._id}`) {
      return this.memberInfo.todoList.slice().sort((a, b) => {
        const aPriority = parseInt(a.priority);
        const bPriority = parseInt(b.priority);
        return (aPriority || 3) - (bPriority || 3);
      });
    } else {
      return this.memberInfo.todoList.filter((todo) => {
        if (location.hash === `#active_${this.memberInfo._id}`) {
          return !todo.isCompleted;
        }
        if (location.hash === `#completed_${this.memberInfo._id}`) {
          return todo.isCompleted;
        }
        return true;
      });
    }
  }

  makeNewTodoList(property, targetId, newValue) {
    const newTodos = this.memberInfo.todoList.map((todo) => {
      if (todo._id === targetId) {
        todo[property] = newValue;
      }
      return todo;
    });
    return newTodos;
  }

  updateFilteredTodoList() {
    this.filterdTodos = this.getFilteredTodoList();
    this.todoList.setTodoList(this.filterdTodos);
    this.todoFilter.setState(this.filterdTodos.length);
  }

  setTodoState(todoList = []) {
    try {
      this.memberInfo = {
        ...this.memberInfo,
        todoList,
      };
      this.updateFilteredTodoList();
    } catch (error) {
      alert(`setTodoState error: ${error.message}`);
    }
  }

  async addTodo(contents) {
    try {
      const newTodoItem = await addTodoItem(
        this.currentTeamId,
        this.memberInfo._id,
        contents
      );
      const todoList = this.memberInfo.todoList || [];
      this.setTodoState(todoList.concat(newTodoItem));
    } catch (error) {
      alert(`addTodo error: ${error.message}`);
    }
  }

  async toggleTodo(targetId) {
    try {
      const updatedTodo = await toggleTodo(
        this.currentTeamId,
        this.memberInfo._id,
        targetId
      );
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
        this.currentTeamId,
        this.memberInfo._id,
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
        this.currentTeamId,
        this.memberInfo._id,
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

  async removeTodo(targetId) {
    try {
      deleteTodoItem(this.currentTeamId, this.memberInfo._id, targetId);
      const memberInfo = await getTodoItemsOfMember(
        this.currentTeamId,
        this.memberInfo._id
      );
      this.setTodoState(
        memberInfo.todoList.filter((todo) => todo._id !== targetId)
      );
    } catch (error) {
      alert(`removeTodo error: ${error.message}`);
    }
  }

  allRemoveTodo() {
    try {
      if (this.memberInfo.todoList.length === 0) {
        throw new Error('삭제할 todo가 없습니다.');
      }
      if (confirm('정말로 전부 삭제하시겠습니까?')) {
        allDeleteTodoItem(this.currentTeamId, this.memberInfo._id);
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
              <a href="#all_${this.memberInfo._id}" class="selected">전체보기</a>
            </li>
            <li>
              <a href="#priority_${this.memberInfo._id}">우선 순위</a>
            </li>
            <li>
              <a href="#active_${this.memberInfo._id}">해야할 일</a>
            </li>
            <li>
              <a href="#completed_${this.memberInfo._id}">완료한 일</a>
            </li>
          </ul>
          <button class="clear-completed">모두 삭제</button>
        </div>
      </div>
    `;
    this.$todoAppListContainer.appendChild(this.$todoContainer);
  }
}
