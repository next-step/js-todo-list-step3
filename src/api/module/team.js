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

  const createMember = (id, name) => {
    return request.post(`/teams/${id}/members`, { name });
  };

  return {
    getAll,
    getById,
    create,
    createMember,
  };
})();

export default team;
