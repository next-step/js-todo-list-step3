import fetchApi from "./fetchApi.js";
const BASE_URL = "https://blackcoffee-todolist.df.r.appspot.com/api/teams";

export const getTeamList = async () => {
  try {
    const teamList = await fetchApi.get(BASE_URL);
    return teamList;
  } catch (error) {
    throw Error(error.message);
  }
};

export const getTeam = async (teamId) => {
  try {
    const team = await fetchApi.get(`${BASE_URL}/${teamId}`);
    return team;
  } catch (error) {
    throw Error(error.message);
  }
};

export const addTeam = async (name) => {
  const newTeam = {
    name,
  };
  const response = await fetchApi.post(BASE_URL, JSON.stringify(newTeam));
  return response;
};

export const deleteTeam = async (teamId) => {
  const team = await fetchApi.delete(`${BASE_URL}/${teamId}`);
  return team;
};
