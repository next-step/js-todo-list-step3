import { validateTodoItems } from "./utils.js";

const BASE_URL = "https://blackcoffee-todolist.df.r.appspot.com";

const request = async (url, option) => {
  try {
    const res = await fetch(url, option);
    if (res.status !== 200) {
      throw new Error(`Error status code : ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    throw Error(error.message);
  }
};

const options = {
  POST: (data) => {
    return {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  },
  DELETE: () => {
    return {
      method: "DELETE",
    };
  },
  TOGGLE: () => {
    return {
      method: "PUT",
    };
  },
  EDIT_CONTENTS: (contents) => {
    return {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    };
  },
  SET_PRIORITY: (priority) => {
    return {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priority }),
    };
  },
};

const fetchTeams = async () => request(`${BASE_URL}/api/teams`);

const addTeam = async (name) =>
  request(`${BASE_URL}/api/teams`, options.POST({ name }));

const deleteTeamById = async (id) =>
  request(`${BASE_URL}/api/teams/${id}`, options.DELETE());

const fetchTeamById = async (id) => request(`${BASE_URL}/api/teams/${id}`);

const api = {
  fetchTeams,
  addTeam,
  deleteTeamById,
  fetchTeamById,
};

export default api;
