import { API } from '@utils/api.js';
import { BASE_URL } from '@constants/constants.js';

const URL = {
  createTeam: () => BASE_URL,
  getTeams: () => BASE_URL,
  getTeam: (teamId) => `${BASE_URL}/${teamId}`,
  deleteTeam: (teamId) => `${BASE_URL}/${teamId}`,
};

const createTeam = async (body) => {
  try {
    const response = await API.post(URL.createTeam(), body);
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status}, ${response.statusText}`);
  } catch (error) {
    console.error(`Create Team Error: ${error}`);
  }
};

const getTeams = async () => {
  try {
    const response = await API.get(URL.getTeams());
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status}, ${response.statusText}`);
  } catch (error) {
    console.error(`GET Team List Error: ${error}`);
  }
};

const getTeam = async (teamId) => {
  try {
    const response = await API.get(URL.getTeam(teamId));
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status}, ${response.statusText}`);
  } catch (error) {
    console.error(`GET Team Error: ${error}`);
  }
};

const deleteTeam = async (teamId) => {
  try {
    const response = await API.delete(URL.deleteTeam(teamId));
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status}, ${response.statusText}`);
  } catch (error) {
    console.error(`Delete Team Error:${error}`);
  }
};

export const teamService = {
  createTeam,
  getTeams,
  getTeam,
  deleteTeam,
};
