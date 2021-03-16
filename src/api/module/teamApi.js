import request from "../utils/request.js";

const teamApi = (() => {
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

  return {
    getAll,
    getById,
    create,
    createMember,
  };
})();

export default teamApi;
