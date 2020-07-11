import TodoList from './TodoList.js';
import TodoInput from './TodoInput.js';
import TodoFilter from './TodoFilter.js';
import { FILTER_TYPE } from '../constants.js';
import {
  getMemberTodoList,
} from '../api/index.js';

function TodoApp({ _id, name, todoList }) {
  this.id = _id;
  this.username = name;
  this.todoList = todoList;

  this.setState = async () => {
    // this.render();
    // await this.getTodoList();
    // this.TodoList.setState(this.todoList);
  };

  this.getTodoList = async () => {
    const { result, error, errorMessage } = await getMemberTodoList(this.user);
    if (error) return alert(errorMessage);
    this.todoList = result.todoList;
  };

  // this.TodoList = new TodoList({
  //   deleteTodo: async (id) => {
  //     await deleteTodoItem(this.user, id);
  //   },
  //   toggleTodo: async (id) => {
  //     await toggleTodoItem(this.user, id);
  //   },
  //   editTodo: async (id, value) => {
  //     await editTodoItem(this.user, id, value);
  //   },
  //   setRootState: this.setState,
  // });
  // this.TodoInput = new TodoInput({
  //   addTodo: async (value) => {
  //     await addMeberTodo(this.user, value);
  //     this.setState();
  //   },
  // });
  // this.$todoCount = document.querySelector('.todo-count');
  // this.TodoFilter = new TodoFilter({
  //   filterTodo: (mode) => {
  //     const renderList = {
  //       [FILTER_TYPE.ALL]: () => this.todoList,
  //       [FILTER_TYPE.ACTIVE]: () => this.todoList.filter((item) => !item.isCompleted),
  //       [FILTER_TYPE.COMPLETED]: () => this.todoList.filter((item) => item.isCompleted),
  //     };
  //     this.TodoList.setState(renderList[mode]());
  //   },
  // });
  // this.UserList = new UserList({
  //   selectUser: (user) => {
  //     this.user = user;
  //     this.setState();
  //   },
  // });

  this.init();
}

export default TodoApp;
