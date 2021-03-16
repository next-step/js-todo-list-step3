import $api from "../../api/index.js";

import { FILTERS, PRIORITY } from "../../utils/constants.js";

const todoState = (() => {
  const state = {};
  const subscriber = {};

  const getTodos = async (memberId) => {
    const response = await $api.todo.getTodos(memberId);
    return response?.map(mapToTodo);
  };

  const mapToTodo = (todo) => {
    const priority = Object.values(PRIORITY).find(
      ({ value }) => value === todo.priority
    );

    return {
      ...todo,
      priority,
    };
  };

  const createTodo = async (memberId, contents) => {
    await $api.todo.createTodo(memberId, contents);
    publish(memberId);
  };

  const deleteTodo = async (memberId, todoId) => {
    await $api.todo.deleteTodo(memberId, todoId);
    publish();
  };

  const deleteAllTodo = async (memberId) => {
    await $api.todo.deleteAllTodo(memberId);
    publish(memberId);
  };

  const toggleTodo = async (memberId, todoId) => {
    await $api.todo.toggleTodo(memberId, todoId);
    publish(memberId);
  };

  const editTodo = async (memberId, todoId, contents) => {
    await $api.todo.editTodo(memberId, todoId, contents);
    publish(memberId);
  };

  const setTodoPriority = async (memberId, todoId, priority) => {
    await $api.todo.setTodoPriority(memberId, todoId, priority);
    publish(memberId);
  };

  const setFilter = (memberId, filter) => {
    if (!state[memberId]) {
      state[memberId] = {};
    }
    state[memberId].filter = filter;
    publish(memberId);
  };

  const getFilter = (memberId) => {
    return state[memberId]?.filter ?? FILTERS.ALL;
  };

  const getFilteredTodos = async (memberId) => {
    const todos = await getTodos(memberId);
    if (state[memberId]?.filter === FILTERS.ACTIVE) {
      return todos.filter((todo) => !todo.isCompleted);
    } else if (state[memberId]?.filter === FILTERS.COMPLETED) {
      return todos.filter((todo) => todo.isCompleted);
    } else if (state[memberId]?.filter === FILTERS.PRIORITY) {
      return todos.sort((a, b) => a.priority.seq - b.priority.seq);
    }
    return todos;
  };

  const subscribe = (memberId, method) => {
    if (!subscriber[memberId]) {
      subscriber[memberId] = [];
    }
    subscriber[memberId].push(method);
  };

  const publish = (memberId) => {
    subscriber[memberId]?.forEach(async (method) => await method());
  };

  return {
    create: createTodo,
    delete: deleteTodo,
    deleteAll: deleteAllTodo,
    toggle: toggleTodo,
    edit: editTodo,
    getAll: getTodos,
    setPriority: setTodoPriority,
    setFilter,
    getFilter,
    getFiltered: getFilteredTodos,
    subscribe,
  };
})();

export default todoState;
