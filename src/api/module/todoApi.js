import request from "../utils/request";

const todoApi = (() => {
  const state = {};

  const setTeamId = (teamId) => {
    state.teamId = teamId;
  };

  const getTodos = (memberId) => {
    return request
      .get(`/teams/${state.teamId}/members/${memberId}`)
      .then((member) => member?.todoList);
  };

  const createTodo = (memberId, contents) => {
    return request.post(`/teams/${state.teamId}/members/${memberId}/items`, {
      contents,
    });
  };

  const deleteTodo = (memberId, todoId) => {
    return request.delete(
      `/teams/${state.teamId}/members/${memberId}/items/${todoId}`
    );
  };

  const deleteAllTodo = (memberId) => {
    return request.delete(`/teams/${state.teamId}/members/${memberId}/items`);
  };

  const toggleTodo = (memberId, todoId) => {
    return request.put(
      `/teams/${state.teamId}/members/${memberId}/items/${todoId}/toggle`
    );
  };

  const editTodo = (memberId, todoId, contents) => {
    return request.put(
      `/teams/${state.teamId}/members/${memberId}/items/${todoId}`,
      { contents }
    );
  };

  const setTodoPriority = (memberId, todoId, priority) => {
    return request.put(
      `/teams/${state.teamId}/members/${memberId}/items/${todoId}/priority`,
      { priority }
    );
  };

  return {
    setTeamId,
    createTodo,
    deleteTodo,
    deleteAllTodo,
    toggleTodo,
    editTodo,
    setTodoPriority,
    getTodos,
  };
})();

export default todoApi;
