import { METHOD } from '../constants.js';

const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/teams';

function getTeamURL(teamId) {
  return `${BASE_URL}/${teamId}`;
}

function getMembersURL(teamId) {
  return `${BASE_URL}/${teamId}/members`;
}

function getMemberURL(teamId, memberId) {
  return `${BASE_URL}/${teamId}/members/${memberId}`;
}

function getTodoListURL(teamId, memberId) {
  return `${BASE_URL}/${teamId}/members/${memberId}/items`;
}

function getTodoItemURL(teamId, memberId, itemId) {
  return `${BASE_URL}/${teamId}/members/${memberId}/items/${itemId}`;
}

function getTodoItemToggleURL(teamId, memberId, itemId) {
  return `${BASE_URL}/${teamId}/members/${memberId}/items/${itemId}/toggle`;
}

function getTodoItemPriorityURL(teamId, memberId, itemId) {
  return `${BASE_URL}/${teamId}/members/${memberId}/items/${itemId}/priority`;
}

async function myFetch(URL, method, data) {
  const fetchOption = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(URL, fetchOption);
  if (!response.ok) throw new Error('유효하지 않은 URL');

  return response.json();
}

export async function getTeamListData() {
  try {
    const result = await myFetch(BASE_URL);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getTeamData(teamId) {
  try {
    const teamURL = getTeamURL(teamId);
    const result = await myFetch(teamURL);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function addTeamData(data = {}) {
  try {
    const result = await myFetch(BASE_URL, METHOD.POST, data);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getMemberData(teamId, memberId) {
  try {
    const memberURL = getMemberURL(teamId, memberId);
    const result = await myFetch(memberURL);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function addMemberData(teamId, data = {}) {
  try {
    const membersURL = getMembersURL(teamId);
    const result = await myFetch(membersURL, METHOD.POST, data);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTodoListData(teamId, memberId) {
  try {
    const todoListURL = getTodoListURL(teamId, memberId);
    const result = await myFetch(todoListURL, METHOD.DELETE);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function addTodoItemData(teamId, memberId, data = {}) {
  try {
    const todoListURL = getTodoListURL(teamId, memberId);
    const result = await myFetch(todoListURL, METHOD.POST, data);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTodoItemData(teamId, memberId, itemId) {
  try {
    const todoItemURL = getTodoItemURL(teamId, memberId, itemId);
    const result = await myFetch(todoItemURL, METHOD.DELETE);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function toggleTodoItemData(teamId, memberId, itemId) {
  try {
    const todoItemToggleURL = getTodoItemToggleURL(teamId, memberId, itemId);
    const result = await myFetch(todoItemToggleURL, METHOD.PUT);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function updateTodoItemData(teamId, memberId, itemId, data = {}) {
  try {
    const todoItemURL = getTodoItemURL(teamId, memberId, itemId);
    const result = await myFetch(todoItemURL, METHOD.PUT, data);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function updateTodoItemPriorityData(teamId, memberId, itemId, data = {}) {
  try {
    const todoItemPriorityURL = getTodoItemPriorityURL(teamId, memberId, itemId);
    const result = await myFetch(todoItemPriorityURL, METHOD.PUT, data);
    return result;
  } catch (error) {
    console.error(error);
  }
}
