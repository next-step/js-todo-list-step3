import config from '../config/index.js';
import http from '../utils/apiRequest.js';

export const getTodoItemsOfMember = async (teamId, memberId) => {
  const todos = await http.get(
    `${config.baseUrl}/teams/${teamId}/members/${memberId}`
  );
  return todos;
};

export const addTodoItem = async (teamId, memberId, contents) => {
  const todo = await http.post(
    `${config.baseUrl}/teams/${teamId}/members/${memberId}/items`,
    JSON.stringify({
      contents,
    })
  );
  return todo;
};

export const updateTodoItem = async (teamId, memberId, itemId, contents) => {
  const todo = await http.put(
    `${config.baseUrl}/teams/${teamId}/members/${memberId}/items/${itemId}`,
    JSON.stringify({
      contents,
    })
  );
  return todo;
};

export const updateTodoPriority = async (
  teamId,
  memberId,
  itemId,
  priority
) => {
  const todo = await http.put(
    `${config.baseUrl}/teams/${teamId}/members/${memberId}/items/${itemId}/priority`,
    JSON.stringify({
      priority,
    })
  );
  return todo;
};

export const deleteTodoItem = async (teamId, memberId, itemId) => {
  const todo = await http.delete(
    `${config.baseUrl}/teams/${teamId}/members/${memberId}/items/${itemId}`
  );
  return todo;
};

export const allDeleteTodoItem = async (teamId, memberId) => {
  const todo = await http.delete(
    `${config.baseUrl}/teams/${teamId}/members/${memberId}/items`
  );
  return todo;
};

export const toggleTodo = async (teamId, memberId, itemId) => {
  const todo = await http.put(
    `${config.baseUrl}/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`
  );
  return todo;
};
