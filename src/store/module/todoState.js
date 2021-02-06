import $api from "../../api/index.js";
import teamState from "./teamState.js";

import { FILTERS, PRIORITY } from "../../utils/constants.js";

const todoState = (() => {
  const state = {};
  const subscriber = {};

  const getTodos = async (memberId) => {
    const response = await $api.team.getTodos(
      teamState.getCurrentTeamId(),
      memberId
    );
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
    await $api.team.createTodo(
      teamState.getCurrentTeamId(),
      memberId,
      contents
    );
    publish(memberId);
  };

  const deleteTodo = async (memberId, todoId) => {
    await $api.team.deleteTodo(teamState.getCurrentTeamId(), memberId, todoId);
    publish();
  };

  const deleteAllTodo = async (memberId) => {
    await $api.team.deleteAllTodo(teamState.getCurrentTeamId(), memberId);
    publish(memberId);
  };

  const toggleTodo = async (memberId, todoId) => {
    await $api.team.toggleTodo(teamState.getCurrentTeamId(), memberId, todoId);
    publish(memberId);
  };

  const editTodo = async (memberId, todoId, contents) => {
    await $api.team.editTodo(
      teamState.getCurrentTeamId(),
      memberId,
      todoId,
      contents
    );
    publish(memberId);
  };

  const setTodoPriority = async (memberId, todoId, priority) => {
    await $api.team.setTodoPriority(
      teamState.getCurrentTeamId(),
      memberId,
      todoId,
      priority
    );
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
