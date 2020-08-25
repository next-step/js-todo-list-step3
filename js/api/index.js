import { requestApi, getApiOption } from '../util.js';
import { METHOD } from '../constants.js';

const BASE_URL = 'https://blackcoffee-todolist.df.r.appspot.com';

export async function getTeams() {
  return requestApi(`${BASE_URL}/api/teams`, getApiOption(METHOD.GET));
}

export async function addTeam(name) {
  return requestApi(`${BASE_URL}/api/teams`, getApiOption(METHOD.POST, { name }));
}

export async function getTeamDetail(teamId) {
  return requestApi(`${BASE_URL}/api/teams/${teamId}`, getApiOption(METHOD.GET));
}

export async function addMember(teamId, name) {
  return requestApi(`${BASE_URL}/api/teams/${teamId}/members`, getApiOption(METHOD.POST, { name }));
}

export async function getMemberTodoList(teamId, memberId) {
  return requestApi(`${BASE_URL}/api/teams/${teamId}/members/${memberId}`, getApiOption(METHOD.GET));
}

export async function addMemberTodo(teamId, memberId, contents) {
  return requestApi(`${BASE_URL}/api/teams/${teamId}/members/${memberId}/items`, getApiOption(METHOD.POST, { contents }));
}

export async function deleteMemberTodo(teamId, memberId, itemId) {
  return requestApi(`${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}`, getApiOption(METHOD.DELETE));
}

export async function toggleMemberTodo(teamId, memberId, itemId) {
  return requestApi(`${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`, getApiOption(METHOD.PUT));
}

export async function editMemberTodo(teamId, memberId, itemId, contents) {
  return requestApi(`${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}`, getApiOption(METHOD.PUT, { contents }));
}

export async function setPriorityMemberTodo(teamId, memberId, itemId, priority) {
  return requestApi(`${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}/priority`, getApiOption(METHOD.PUT, { priority }));
}

export async function deleteMemberAllTodo(teamId, memberId) {
  return requestApi(`${BASE_URL}/api/teams/${teamId}/members/${memberId}/items`, getApiOption(METHOD.DELETE));
}
