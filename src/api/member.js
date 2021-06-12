import { API } from '../utils/api.js';
import { BASE_URL } from '../constants/constants.js';

const URL = {
  createMember: (teamId) => `${BASE_URL}/${teamId}/members`,
  getTodoListByMember: (teamId, memberId) => `${BASE_URL}/${teamId}/members/${memberId}`,
};

const createMember = async (teamId, body) => {
  try {
    const response = await API.post(URL.createMember(teamId), body);
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status}, ${response.statusText}`);
  } catch (error) {
    console.error(`Create Member Error: ${error}`);
  }
};

const getTodoListByMember = async (teamId, memberId) => {
  try {
    const response = await API.get(URL.getTodoListByMember(teamId, memberId));
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status}, ${response.statusText}`);
  } catch (error) {
    console.error(`GET TodoList By Member Error: ${error}`);
  }
};

export const memberAPI = {
  createMember,
  getTodoListByMember,
};
