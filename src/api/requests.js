import { PATH } from "./path.js";
import { GET, POST, DELETE, PUT } from "./http.js";

export const getTeamsAPI = () => GET(`${PATH}/teams`);
export const getTeamAPI = (teamId) => GET(`${PATH}/teams/${teamId}`);
export const createTeamAPI = (data) => POST(`${PATH}/teams`, data)
export const createTodoItem = (teamId, memberId, data) =>
  POST(`${PATH}/teams/${teamId}/members/${memberId}/items`, data);

