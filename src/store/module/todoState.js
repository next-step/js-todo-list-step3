import $api from "../../api/index.js";
import teamState from "./teamState.js";

const todoState = (() => {
  const subscriber = [];

  const getTodos = async (memberId) => {
    return await $api.team.getTodos(teamState.getCurrentTeamId(), memberId);
  };

  const createTodo = async (memberId, contents) => {
    await $api.team.createTodo(
      teamState.getCurrentTeamId(),
      memberId,
      contents
    );
    publish();
  };

  const deleteTodo = async (memberId, todoId) => {
    await $api.team.deleteTodo(teamState.getCurrentTeamId(), memberId, todoId);
    publish();
  };

  const toggleTodo = async (memberId, todoId) => {
    await $api.team.toggleTodo(teamState.getCurrentTeamId(), memberId, todoId);
    publish();
  };

  const editTodo = async (memberId, todoId, contents) => {
    await $api.team.editTodo(
      teamState.getCurrentTeamId(),
      memberId,
      todoId,
      contents
    );
    publish();
  };

  const subscribe = (method) => {
    subscriber.push(method);
  };

  const publish = () => {
    subscriber.forEach(async (method) => await method());
  };

  return {
    create: createTodo,
    delete: deleteTodo,
    toggle: toggleTodo,
    edit: editTodo,
    getAll: getTodos,
    subscribe,
  };
})();

export default todoState;
