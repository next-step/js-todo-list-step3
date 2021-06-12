import { API } from '../utils/api.js';
import { BASE_URL } from '../constants/constants.js';

const URL = {
  createTodoItem: (teamId, memberId) => `${BASE_URL}/${teamId}/members/${memberId}/items`,
  deleteTodoItem: (teamId, memberId, itemId) =>
    `${BASE_URL}/${teamId}/members/${memberId}/items/${itemId}`,
  updateTodoItemContents: (teamId, memberId, itemId) =>
    `${BASE_URL}/${teamId}/members/${memberId}/items/${itemId}`,
  toggleTodoItem: (teamId, memberId, itemId) =>
    `${BASE_URL}/${teamId}/members/${memberId}/items/${itemId}/toggle`,
  priorityTodoItem: (teamId, memberId, itemId) =>
    `${BASE_URL}/${teamId}/members/${memberId}/items/${itemId}/priority`,
  allDeleteTodo: (teamId, memberId) => `${BASE_URL}/${teamId}/members/${memberId}/items`,
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

const updateTodoItemContents = async (teamId, memberId, itemId, body) => {
  try {
    const response = await API.put(URL.updateTodoItemContents(teamId, memberId, itemId), body);
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

const priorityTodoItem = async (teamId, memberId, itemId, body) => {
  try {
    const response = await API.put(URL.priorityTodoItem(teamId, memberId, itemId), body);
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status}, ${response.statusText}`);
  } catch (error) {
    console.error(`Create Member Error: ${error}`);
  }
};

const allDeleteTodo = async (teamId, memberId) => {
  try {
    const response = await API.delete(URL.allDeleteTodo(teamId, memberId));
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
  updateTodoItemContents,
  toggleTodoItem,
  priorityTodoItem,
  allDeleteTodo,
};
