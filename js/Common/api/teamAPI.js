import { request, options } from "./request.js";
import { BASE_URL, METHOD } from "../constans.js";

const fetchTeams = async () => request(`${BASE_URL}/api/teams`);

const addTeam = async (name) =>
  request(`${BASE_URL}/api/teams`, options(METHOD.POST, { name }));

const deleteTeamById = async (id) =>
  request(`${BASE_URL}/api/teams/${id}`, options(METHOD.DELETE));

const fetchTeamById = async (id) => request(`${BASE_URL}/api/teams/${id}`);

const api = {
  fetchTeams,
  addTeam,
  deleteTeamById,
  fetchTeamById,
};

export default api;
