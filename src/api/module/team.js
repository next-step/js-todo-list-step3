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

  const toggleTodo = (teamId, memberId, todoId) => {
    return request.put(
      `/teams/${teamId}/members/${memberId}/items/${todoId}/toggle`
    );
  };

  const getTodos = (teamId, memberId) => {
    return request
      .get(`/teams/${teamId}/members/${memberId}`)
      .then((member) => member?.todoList);
  };

  return {
    getAll,
    getById,
    create,
    createMember,
    createTodo,
    deleteTodo,
    toggleTodo,
    getTodos,
  };
})();

export default team;
