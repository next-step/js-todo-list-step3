import TodoList from './TodoList.js';
import TodoInput from './TodoInput.js';
import TodoFilter from './TodoFilter.js';
import {
  getMemberTodoList, addMemberTodo, deleteMemberTodo, toggleMemberTodo, editMemberTodo, setPriorityMemberTodo, deleteMemberAllTodo,
} from '../api/index.js';

import { todoItemTemplate } from '../template.js';
import { FILTER_TYPE } from '../constants.js';

function TodoApp(teamId, { _id, name, todoList }) {
  this.teamId = teamId;
  this.memberId = _id;
  this.username = name;
  this.todoList = todoList;

  const $todoApp = document.getElementById(this.memberId);
  const $todoList = $todoApp.querySelector('.todo-list');
  const $allDeleteButton = $todoApp.querySelector('.clear-completed');

  $allDeleteButton.addEventListener('click', (event) => this.deleteAllTodo(event));

  this.setState = async (newTodoList) => {
    this.todoList = newTodoList;
    this.render();
    this.TodoList.setState(this.todoList);
  };

  this.render = (list) => {
    $todoList.innerHTML = (list || this.todoList).map((item) => todoItemTemplate(item));
  };

  this.getTodoList = async () => {
    const { result, error, errorMessage } = await getMemberTodoList(this.teamId, this.memberId);
    if (error) return alert(errorMessage);
    this.setState(result.todoList);
  };

  this.addTodo = async (newTodoContents) => {
    await addMemberTodo(this.teamId, this.memberId, newTodoContents);
  };

  this.deleteTodo = async (itemId) => {
    await deleteMemberTodo(this.teamId, this.memberId, itemId);
  };

  this.toggleTodo = async (itemId) => {
    await toggleMemberTodo(this.teamId, this.memberId, itemId);
  };

  this.editTodo = async (itemId, newTodoContents) => {
    await editMemberTodo(this.teamId, this.memberId, itemId, newTodoContents);
  };

  this.setPriority = async (itemId, priority) => {
    await setPriorityMemberTodo(this.teamId, this.memberId, itemId, priority);
  };

  this.deleteAllTodo = async () => {
    await deleteMemberAllTodo(this.teamId, this.memberId);
    this.getTodoList(this.teamId);
  };

  this.TodoInput = new TodoInput({
    $rootElement: $todoApp,
    addTodo: async (value) => {
      await this.addTodo(value);
      this.getTodoList(this.teamId);
    },
  });

  this.TodoList = new TodoList({
    $rootElement: $todoApp,
    deleteTodo: async (itemId) => {
      await this.deleteTodo(itemId);
      this.getTodoList(this.teamId);
    },
    toggleTodo: async (itemId) => {
      await this.toggleTodo(itemId);
      this.getTodoList(this.teamId);
    },
    editTodo: async (itemId, value) => {
      await this.editTodo(itemId, value);
      this.getTodoList(this.teamId);
    },
    setPriority: async (itemId, priority) => {
      await this.setPriority(itemId, priority);
      this.getTodoList(this.teamId);
    },
  });

  this.TodoFilter = new TodoFilter({
    $rootElement: $todoApp,
    filterTodo: (mode) => {
      const renderList = {
        [FILTER_TYPE.ALL]: () => this.todoList,
        [FILTER_TYPE.PRIORITY]: () => this.todoList.map((item) => ({ ...item })).sort((a, b) => a.priority - b.priority),
        [FILTER_TYPE.ACTIVE]: () => this.todoList.filter((item) => !item.isCompleted),
        [FILTER_TYPE.COMPLETED]: () => this.todoList.filter((item) => item.isCompleted),
      };
      this.render(renderList[mode]());
    },
  });

  this.init = () => {
    this.setState(this.todoList);
  };

  this.init();
}

export default TodoApp;
