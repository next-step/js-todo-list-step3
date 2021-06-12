import { API } from '../utils/api.js';
import { BASE_URL } from '../constants/constants.js';

const URL = {
  createTodoItem: (teamId, memberId) => `${BASE_URL}/${teamId}/members/${memberId}/items`,
  deleteTodoItem: (teamId, memberId, itemId) =>
    `${BASE_URL}/${teamId}/members/${memberId}/items/${itemId}`,
  toggleTodoItem: (teamId, memberId, itemId) =>
    `${BASE_URL}/${teamId}/members/${memberId}/items/${itemId}/toggle`,
};

const createTodoItem = async (teamId, memberId, body) => {
  try {
    const response = await API.post(URL.createTodoItem(teamId, memberId), body);
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status}, ${response.statusText}`);
  } catch (error) {
    console.error(`Create Member Error: ${error}`);
  }
};

const deleteTodoItem = async (teamId, memberId, itemId) => {
  try {
    const response = await API.delete(URL.deleteTodoItem(teamId, memberId, itemId));
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status}, ${response.statusText}`);
  } catch (error) {
    console.error(`Create Member Error: ${error}`);
  }
};

const toggleTodoItem = async (teamId, memberId, itemId) => {
  try {
    const response = await API.put(URL.toggleTodoItem(teamId, memberId, itemId));
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status}, ${response.statusText}`);
  } catch (error) {
    console.error(`Create Member Error: ${error}`);
  }
};

export const todoAPI = {
  createTodoItem,
  deleteTodoItem,
  toggleTodoItem,
};
