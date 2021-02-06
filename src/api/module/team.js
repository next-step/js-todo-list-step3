import request from "../utils/request.js";

const team = (() => {
  const getAll = () => {
    return request.get(`/teams`);
  };

  const getById = (id) => {
    return request.get(`/teams/${id}`);
  };

  const create = (name) => {
    return request.post(`/teams`, { name });
  };

  const createMember = (teamId, name) => {
    return request.post(`/teams/${teamId}/members`, { name });
  };

  const getTodos = (teamId, memberId) => {
    return request
      .get(`/teams/${teamId}/members/${memberId}`)
      .then((member) => member?.todoList);
  };

  const createTodo = (teamId, memberId, contents) => {
    return request.post(`/teams/${teamId}/members/${memberId}/items`, {
      contents,
    });
  };

  const deleteTodo = (teamId, memberId, todoId) => {
    return request.delete(
      `/teams/${teamId}/members/${memberId}/items/${todoId}`
    );
  };

  const deleteAllTodo = (teamId, memberId) => {
    return request.delete(`/teams/${teamId}/members/${memberId}/items`);
  };

  const toggleTodo = (teamId, memberId, todoId) => {
    return request.put(
      `/teams/${teamId}/members/${memberId}/items/${todoId}/toggle`
    );
  };

  const editTodo = (teamId, memberId, todoId, contents) => {
    return request.put(`/teams/${teamId}/members/${memberId}/items/${todoId}`, {
      contents,
    });
  };

  return {
    getAll,
    getById,
    create,
    createMember,
    createTodo,
    deleteTodo,
    deleteAllTodo,
    toggleTodo,
    editTodo,
    getTodos,
  };
})();

export default team;
