import { request, HTTP_METHOD } from './request.js';

export const getTeamList = async () => {
  const res = await request(HTTP_METHOD.GET, 'api/teams');
  return res.json();
};

export const getTeamMembers = async (teamId) => {
  const res = await request(HTTP_METHOD.GET, `api/teams/${teamId}`);
  return res.json();
};

export const addTeam = async (name) => {
  const payload = { name };
  const res = await request(HTTP_METHOD.POST, 'api/teams', payload);
  return res.json();
};

export const deleteTeam = async (teamId) => {
  const res = await request(HTTP_METHOD.DELETE, `api/teams/${teamId}`);
  return res.json();
};

export const addTeamMember = async (teamId, name) => {
  const payload = { name };
  const res = await request(HTTP_METHOD.POST, `api/teams/${teamId}/members`, payload);
  return res.json();
};

export const getTodoListInTeamMember = async (teamId, memberId) => {
  const res = await request(HTTP_METHOD.GET, `api/teams/${teamId}/members/${memberId}`);
  return res.json();
};

export const addTodoItemOfTeamMember = async (teamId, memberId, contents) => {
  const payload = { contents };
  const res = await request(HTTP_METHOD.POST, `api/teams/${teamId}/members/${memberId}/items`, payload);
  return res.json();
};

export const deleteTodoItemOfTeamMember = async (teamId, memberId, itemId) => {
  const res = await request(HTTP_METHOD.DELETE, `api/teams/${teamId}/members/${memberId}/items/${itemId}`);
  return res.json();
};

export const toggleTodoItemOfTeamMember = async (teamId, memberId, itemId) => {
  const res = await request(HTTP_METHOD.PUT, `api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`);
  return res.json();
};

export const updateUserTodoContentsOfTeamMember = async (teamId, memberId, itemId, contents) => {
  const payload = { contents };
  const res = await request(HTTP_METHOD.PUT, `api/teams/${teamId}/members/${memberId}/items/${itemId}`, payload);
  return res.json();
};

export const updateTodoPriorityOfTeamMember = async (teamId, memberId, itemId, priority) => {
  const payload = { priority };
  const res = await request(HTTP_METHOD.PUT, `api/teams/${teamId}/members/${memberId}/items/${itemId}/priority`, payload);
  return res.json();
};

export const deleteAllTodoListOfTeamMember = async (teamId, memberId) => {
  const res = await request(HTTP_METHOD.DELETE, `api/teams/${teamId}/members/${memberId}/items`);
  return res.json();
};
