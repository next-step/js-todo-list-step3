import { METHOD } from './constants.js';

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

const ERROR = new Error('유효하지 않은 URL');

export async function getTeamListData() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw ERROR;

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getTeamData(teamId) {
  try {
    const teamURL = getTeamURL(teamId);
    const response = await fetch(teamURL);
    if (!response.ok) throw ERROR;

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function addTeamData(data = {}) {
  try {
    const response = await fetch(BASE_URL, {
      method: METHOD.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw ERROR;

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getMemberData(teamId, memberId) {
  try {
    const memberURL = getMemberURL(teamId, memberId);
    const response = await fetch(memberURL);
    if (!response.ok) throw ERROR;

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function addMemberData(teamId, data = {}) {
  try {
    const membersURL = getMembersURL(teamId);
    const response = await fetch(membersURL, {
      method: METHOD.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw ERROR;

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTodoListData(teamId, memberId) {
  try {
    const todoListURL = getTodoListURL(teamId, memberId);
    const response = await fetch(todoListURL, {
      method: METHOD.DELETE,
    });
    if (!response.ok) throw ERROR;

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function addTodoItemData(teamId, memberId, data = {}) {
  try {
    const todoListURL = getTodoListURL(teamId, memberId);
    const response = await fetch(todoListURL, {
      method: METHOD.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw ERROR;

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTodoItemData(teamId, memberId, itemId) {
  try {
    const todoItemURL = getTodoItemURL(teamId, memberId, itemId);
    const response = await fetch(todoItemURL, {
      method: METHOD.DELETE,
    });
    if (!response.ok) throw ERROR;

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function toggleTodoItemData(teamId, memberId, itemId) {
  try {
    const todoItemToggleURL = getTodoItemToggleURL(teamId, memberId, itemId);
    const response = await fetch(todoItemToggleURL, {
      method: METHOD.PUT,
    });
    if (!response.ok) throw ERROR;

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function updateTodoItemData(teamId, memberId, itemId, data = {}) {
  try {
    const todoItemURL = getTodoItemURL(teamId, memberId, itemId);
    const response = await fetch(todoItemURL, {
      method: METHOD.PUT,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw ERROR;

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function updateTodoItemPriorityData(teamId, memberId, itemId, data = {}) {
  try {
    const todoItemPriorityURL = getTodoItemPriorityURL(teamId, memberId, itemId);
    const response = await fetch(todoItemPriorityURL, {
      method: METHOD.PUT,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw ERROR;

    return response.json();
  } catch (error) {
    console.error(error);
  }
}
