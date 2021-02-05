import request from "../utils/request.js";

const team = (() => {
  const getAll = () => {
    return request.get("/teams");
  };

  const create = (name) => {
    return request.post("/teams", { name });
  };

  return {
    getAll,
    create,
  };
})();

export default team;
