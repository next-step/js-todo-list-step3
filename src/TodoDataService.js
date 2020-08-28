import {
  getMember,
  addTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
  changePriorityTodo,
  deleteAllTodo,
} from "./apis/team.js";
import { FILTER } from "./utils/constants.js";

export default function TodoDataService(teamId, memberId) {
  let loading = false;
  let filter = location.hash.replace("#", "");
  let todos = [];
  let callbacks = [];

  this.subscribe = (callback) => callbacks.push(callback);

  const setLoading = (status) => {
    loading = status;
    publish();
  };

  const sortPriority = (a, b) => {
    if (a.isCompleted) {
      return 1;
    }

    if (b.isCompleted) {
      return -1;
    }

    return a.priority < b.priority ? -1 : 1;
  };

  this.getFilteredTodos = () => {
    switch (filter) {
      case FILTER.ACTIVE:
        return todos.filter((todo) => !todo.isCompleted);
      case FILTER.COMPLETED:
        return todos.filter((todo) => todo.isCompleted);
      case FILTER.PRIORITY:
        return todos.slice().sort(sortPriority);
      default:
        return todos;
    }
  };

  const publish = () => {
    const filteredTodos = this.getFilteredTodos();
    callbacks.forEach((callback) =>
      callback({ todos: filteredTodos, loading })
    );
  };

  this.loadTodo = async () => {
    setLoading(true);
    const member = await getMember(teamId, memberId);
    todos = member.todoList || [];
    setLoading(false);
  };

  this.addTodo = async (contents) => {
    await addTodo(teamId, memberId, contents);
    await this.loadTodo();
  };

  this.deleteTodo = async (itemId) => {
    await deleteTodo(teamId, memberId, itemId);
    await this.loadTodo();
  };

  this.toggleTodo = async (itemId) => {
    await toggleTodo(teamId, memberId, itemId);
    await this.loadTodo();
  };

  this.editTodo = async (itemId, contents) => {
    await editTodo(teamId, memberId, itemId, contents);
    await this.loadTodo();
  };

  this.changePriorityTodo = async (itemId, priority) => {
    await changePriorityTodo(teamId, memberId, itemId, priority);
    await this.loadTodo();
  };

  this.deleteAllTodo = async () => {
    await deleteAllTodo(teamId, memberId);
    await this.loadTodo();
  };

  this.setFilter = (newFilter) => {
    filter = newFilter;
    publish();
  };

  this.getFilter = () => filter;
}
