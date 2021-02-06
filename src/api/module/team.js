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

  return {
    getAll,
    getById,
    create,
    createMember,
    createTodo,
  };
})();

export default team;
